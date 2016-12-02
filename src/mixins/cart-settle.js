// 促销结算原则
// 1. 订单促销结算: 订单满减和满赠同时享受(条件金额为商品优惠后的总额)，但订单折扣只对 share_order 为true的商品(总价)打折
// 2. goods促销为按组促销，即购买一个促销活动的多件商品求总后参加一次促销结算
// 3. time 促销为单品促销
// 4. 参加 goods 或 time 促销的商品不再参加订单打折促销， 但可计入订单满减满赠促销的参加条件
// 5. 考虑退款金额，应计算(或后台)每件单品的结算金额，goods组促销应按比例分摊优惠


// cart-promotions mixins
// 在购物车或促销展示等页面使用
import {
  mapState,
} from 'vuex'

export default {
  computed: {
    ...mapState({
      promTime: state => state.promotion.time,
      promGoods: state => state.promotion.goods,
      promOrder: state => state.promotion.order,
      checkedOfState: state => state.cart.checked,
    }),
    // 促销分组
    groups() {
      // 将相同 goods 类促销分组，其他一条记录为一组，方便按 group index 统计
      // 即按 可购买->促销类型->prom_id||sku_id分组
      let group = _.groupBy(_.cloneDeep(this.added), (item) => {
        return `${this.canBuy(item)}${item.prom_type}${item.prom_type === 'goods' ? item.prom_id : item.sku_id}`
      })
      // 再将分组按 可购买->有促销 排序，(促销放前面，不能购买放后面)
      return _.orderBy(group, (item) => `${this.canBuy(_.head(item))}${_.head(item).prom_type}`, 'desc')
    },
    // 组促销
    // 用来显示页面促销信息, 以组索引和 groups 关联
    // 返回数据： this.getGroupSettleData() 中的 settle 对象
    groupsProm() {
      let proms = []
      _.forEach(_.cloneDeep(this.groups), (value, index) => {
        let data = _.map(value, (sku) => {
          // 以 √ 商品为实时计算促销数据依据
          let now = sku
          if (this.checkedOfState.indexOf(sku.sku_id) == -1) {
            now.buy_nums = 0
          }
          return now
        })
        proms[index] = this.getGroupSettleData(data)
        proms[index].visible = proms[index].tag && proms[index].message
      })
      return proms
    },
    // 组促销选中商品结算数据
    // 结算依据, 以组索引和 groups 关联
    // 返回数据： this.getGroupSettleData() 中的 settle 对象
    groupsCheckedProm() {
      let proms = []
      _.forEach(this.groups, (value, index) => {
        // 以 √ 商品为结算数据
        let data = _.filter(value, (sku) => this.checkedOfState.indexOf(sku.sku_id) !== -1)
        proms[index] = this.getGroupSettleData(data)
        proms[index].visible = proms[index].tag && proms[index].message
      })
      return proms
    },
    // 组结算
    groupsSettle() {
      let data = {
        sku_amount: 0,
        discounted: 0,
        settle_amount: 0,
        share_order_amount: 0, // 可参加订单促销总金额
      }
      _.forEach(this.groupsCheckedProm, (group, index) => {
        data.sku_amount += parseFloat(group.sku_amount)
        data.discounted += parseFloat(group.discounted)
        if (group.share_order) data.share_order_amount += parseFloat(group.sku_amount)
      })
      data.settle_amount = data.sku_amount - data.discounted
      return data
    },
    // 订单促销结算
    orderPromSettle() {
      return this.getOrderPromSettleData()
    },
    // 购物车结算
    cartSettle() {
      let group = this.groupsSettle
      // return {
      //   sku_amount: group.sku_amount,
      //   discounted: group.discounted,
      //   settle_amount: group.settle_amount
      // }
      return {
        sku_amount: group.sku_amount,
        discounted: group.discounted + this.orderPromSettle.discount.discounted,
        settle_amount: group.settle_amount - this.orderPromSettle.discount.discounted,
      }
      // return {
      //   sku_amount: 0,
      //   discounted: 0,
      //   settle_amount: 0,
      // }
    },
  },
  methods: {
    canBuy(item) {
      return item.is_onsale && item.sku_nums > 0 && item.buy_nums <= item.sku_nums
    },

    // return: settle Object
    getGroupSettleData(group) {
      let settle = {
        tag: '',
        message: '',
        visible: false, // 促销信息可见
        // 结算金额 = sku_amount - discounted
        sku_amount: 0,
        discounted: 0,
        gift: '',
        prom_id: 0,
        prom_type: '',
        prom_name: '',
        share_order: true,
      }
      if (_.isEmpty(group)) return settle
      let prom_id = _.head(group).prom_id
      let prom_type = _.head(group).prom_type
      let prom = _.find(prom_type === 'goods' ? this.promGoods : this.promTime, (prom) => prom.id == prom_id )
      if (_.isEmpty(prom)) prom = {}
      let time = parseInt(Date.now()/1000)
      settle.prom_id = prom_id
      settle.prom_type = prom_type
      settle.prom_name = prom.name || ''
      settle.share_order = prom.share_order === undefined ? true : !!prom.share_order

      // 原价及限时促销
      let buy_nums = 0
      for (let i = 0; i < group.length; i++) {
        let sku = group[i]
        if (!this.canBuy(sku)) {
          continue
        }
        // 累计原价
        settle.sku_amount += parseFloat(sku.shop_price) * parseInt(sku.buy_nums)
        buy_nums += parseInt(sku.buy_nums)
        // 限时促销（分组时已确保每个限时促销组只有一条记录）
        if (prom_type === 'time') {
          if ((prom.start_time && time < prom.start_time) || (prom.end_time && time > prom.end_time)) {
            continue
          }
          let settle_price = _.find(prom.sku_info, (value, key) => key == sku.sku_id)
          // 累计优惠
          settle.discounted += (parseFloat(sku.shop_price) - parseFloat(settle_price)) * parseInt(sku.buy_nums)
          settle.tag = '限时'
          settle.message = `已享优惠立减 ${Math.abs(settle.discounted).toFixed(2)} 元`
        }
      }
      // END 原价统计 & time promotion

      // goods promotion
      // 自动计算优惠最多或满足条件最高的促销规则
      if (prom_type === 'goods') {
        if ((prom.start_time && time < prom.start_time) || (prom.end_time && time > prom.end_time)) {
          return settle
        }
        let rulesData = _.sortBy(prom.rules, (rule) => {return parseFloat(rule.condition)})
        // 计算各规则
        let rules = []
        _.forEach(rulesData, (rule, index) => {
          // 条件参数
          let payload = rule.type.indexOf('amount') !== -1 ? settle.sku_amount : buy_nums
          // 条件单位
          let unit = rule.type.indexOf('amount') !== -1 ? '元' : '件'
          // 优惠动作
          let action = rule.type.indexOf('discount') !== -1 ? '减' : '赠'
          rules[index] = {
            type: rule.type,
            condition: parseFloat(rule.condition),
            discount: 0,
            gift: '',
            tag: `满${action}`,
          }
          // 满减
          if (action === '减') {
            rules[index].tag = unit === '件' ? '满件减' : '满减'
            rules[index].discount = parseFloat(rule.discount)
            if (payload >= rule.condition) {
              rules[index].message = `已享满${rule.condition}${unit}减${rule.discount}元`
            } else {
              rules[index].message = ` 再凑${rule.condition - payload}${unit}可减${rule.discount}元`
            }
            // 打折
            if (parseFloat(rule.discount) <= 0.5) {
              rules[index].tag = unit === '件' ? '满件折' : '折扣'
              rules[index].discount = settle.sku_amount * parseFloat(rule.discount)
              let sale = (1 - parseFloat(rule.discount)) * 10
              if (payload >= rule.condition) {
                rules[index].message = `已享${sale}折优惠${(rules[index].discount).toFixed(2)}元`
              } else { // 主要对满件折
                rules[index].message = ` 凑满${rule.condition}${unit}可享${sale}折优惠`
              }
            }
          }
          // 满赠
          if (action === '赠') {
            rules[index].tag = unit === '件' ? '满件赠' : '满赠'
            rules[index].gift = rule.discount
            if (payload >= rule.condition) {
              rules[index].message = `已享如下赠品`
            } else {
              let need = unit === '元' ? (rule.condition - payload).toFixed(2) : parseInt(rule.condition - payload)
              rules[index].message = ` 再凑${need}${unit}可送:${rule.discount.sku_name}`
            }
          }
        })
        // END froEach

        // 筛选最优规则
        let best = _.filter(rules, (rule) => {
          let payload = rule.type.indexOf('amount') !== -1 ? settle.sku_amount : buy_nums
          return payload >= parseFloat(rule.condition)
        })
        best = _.maxBy(best, (rule) => parseFloat(rule.discount) || parseFloat(rule.condition))
        if (best) {
          settle.discounted = best.discount
          settle.gift = best.gift
          settle.tag = best.tag
          settle.message = best.message
        }
        // 下一个优惠
        let next = _.filter(rules, (rule) => {
          let payload = rule.type.indexOf('amount') !== -1 ? settle.sku_amount : buy_nums
          return payload < parseFloat(rule.condition)
        })
        next = _.minBy(next, (rule) => parseFloat(rule.discount) || parseFloat(rule.condition))
        if (next) {
          settle.tag = next.tag
          settle.message += next.message
        }
      }
      // END goods 促销

      return settle
    },

    // return: data Object
    getOrderPromSettleData() {
      let data = {
        // 满赠
        give: {
          tag: '',
          message: '',
          gift: '',
        },
        // 满减
        discount: {
          tag: '',
          message: '',
          discounted: 0,
        }
      }
      if (_.isEmpty(this.promOrder)) return data
      // 有效促销
      let time = parseInt(Date.now()/1000)
      let proms = _.filter(this.promOrder, (prom) => (prom.start_time && time < prom.start_time) || (prom.end_time && time > prom.end_time) ? false :true)
      let payload = this.groupsSettle.settle_amount
      let share_order_amount = this.groupsSettle.share_order_amount

      // 满减满折
      let discount = _.filter(proms, (prom) => prom.type == 0)
      // 最优满减
      let bestDiscount = _.maxBy(discount, (prom) => {
        let condition = parseFloat(prom.price)
        if (condition == 1) { // 订单打折
          return share_order_amount * parseFloat(prom.discount)
        } else if(payload >= condition) { // 订单满减
          return parseFloat(prom.discount)
        }
      })
      if (bestDiscount) {
        let condition = parseFloat(bestDiscount.price)
        let discount = parseFloat(bestDiscount.discount)
        let discounted = condition == 1 ? share_order_amount * discount : discount
        data.discount.discounted = discounted
        data.discount.tag = condition == 1 ? `全场 ${((1-bestDiscount.discount)*10).toFixed(1)} 折` : '满减'
        if (discounted > 0) {
          data.discount.message = condition == 1 ? `已享${data.discount.tag}，立减${discounted.toFixed(2)}元` : `已享满${condition}元减${discounted.toFixed(2)}元`
        }
      }
      // 下一个满减
      let nextDiscount = _.filter(discount, (prom) => {
        return payload < parseFloat(prom.price) && data.discount.discounted < prom.discount ? true : false
      })
      nextDiscount = _.minBy(nextDiscount, (prom) => parseFloat(prom.price))
      if (nextDiscount) {
        let condition = parseFloat(nextDiscount.price)
        data.discount.tag = '满减'
        if (condition != 1) {
          data.discount.message += ` 再凑${(condition - payload).toFixed(2)}元减${nextDiscount.discount}元`
        } else {
          data.discount.message = `全场 ${((1-nextDiscount.discount)*10).toFixed(1)} 折`
        }
      }

      // 满赠
      let give = _.filter(proms, (prom) => prom.type == 2)
      // 全场满赠活动参与条件金额为所有优惠(包括订单优惠)后的实付金额
      let givePayload = this.groupsSettle.settle_amount - data.discount.discounted
      // 最优满赠
      let bestGive = _.filter(give, (prom) => givePayload >= parseFloat(prom.price))
      bestGive = _.maxBy(bestGive, (prom) => parseFloat(prom.price))
      if (bestGive) {
        data.give.gift = bestGive.discount
        data.give.tag = '满赠'
        data.give.message = `已享满${bestGive.price}送如下赠品`
      }
      // 下一个满赠
      let nextGive = _.filter(give, (prom) => givePayload < parseFloat(prom.price))
      nextGive = _.minBy(nextGive, (prom) => parseFloat(prom.price))
      if (nextGive) {
        let condition = parseFloat(nextGive.price)
        data.give.tag = '满赠'
        data.give.message += ` 再凑${(condition - givePayload).toFixed(2)}元送${nextGive.discount.sku_name}`
      }

      return data
    }
    // END getOrderPromSettleData()
  },
  // END methods

}
