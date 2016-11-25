<template>
<view-box>
  <x-header slot="header" title="购物车">
    <div slot="right" @click="edit" v-text="editing ? '完成' : '编辑'" style="margin-right: 0.4rem" v-if="!emptyCart"></div>
  </x-header>

  <cells>
    <cell v-for="item of addedSort" :key="item.sku_id" class="cart-item">
      <div slot="left" class="item-left">
        <checkbox class="checkitem" v-model="checked" :option="item.sku_id" :disabled="!canBuy(item) && !editing"></checkbox>
        <x-img :tag="tag(item)" :tag-color="tagColor(item)" :src="IMG_ROOT + item.sku_thumb" :width="(190/75)+'rem'" :height="(190/75)+'rem'" border :radius="4"></x-img>
      </div>
      <div class="item-body">
        <span class="item-name">{{item.sku_name}}</span>
        <span class="item-spec" :class="{'item-spec-border': editing && spec(item)}" v-text="spec(item)"></span><br>
        <span class="item-prom" :class="{'item-prom-border':itemPromInfo(item)}" v-text="itemPromInfo(item)"></span><br>
        <div class="price-and-nums">
          <currency :value="item.shop_price" color="black" size="16px" float-size="14px"></currency>
          <div class="nums">
            <span v-show="!editing">× {{item.buy_nums}}</span>
            <x-number v-if="editing" v-model="item.buy_nums" ref="xnums" @on-change="update(item.sku_id, item.buy_nums)" :min="1" :max="item.sku_nums" :readonly="!canBuy(item)"></x-number>
          </div>
        </div>
      </div>
    </cell>
  </cells>

  <div class="empty-cart" v-if="emptyCart" @click="$router.push({path: '/'})">
    <icon name="cart" size="100px" color="#E7E7E7"></icon>
    <p>空空如也 去逛逛吧</p>
  </div>

  <!-- 底部 -->
  <div slot="bottom" class="bottom" v-if="!emptyCart && !inputing">
    <div class="checkall">
      <checkbox v-model="checkall" option="全选" label="全选"></checkbox>
    </div>
    <div class="bottom-center">
      <div class="total" v-if="!editing">
        合计：<currency :value="totalSettle" size="16px" float-size="16px" color="black">
      </div>
      <div class="total-desc" v-if="!editing">
        总计:<currency :value="totalSku" size="10px" float-size="10px" color="gray-light-extra"></currency>&nbsp;
        立减:<currency :value="totalDiscounted" size="10px" float-size="10px" color="gray-light-extra"></currency>
      </div>
    </div>
    <div class="bottom-right" :style="disabledStyle">
      <div class="checkout" v-if="!editing">结算<span class="checked-nums">（{{checkedCount}}）</span></div>
      <div class="delete" v-if="editing" @click="deleteSku">批量删除</div>
    </div>
  </div>

</view-box>
</template>

<script>
import Api from 'src/libs/api'
import LocalCart from 'src/libs/local-cart'
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'
import {
  IMG_ROOT
} from 'src/config'
import {
  Cell,
  Cells,
  Checkbox,
  Currency,
  Icon,
  ViewBox,
  XImg,
  XHeader,
  XNumber,
} from 'ui/components'

export default {
  components: {
    Cell,
    Cells,
    Checkbox,
    Currency,
    Icon,
    ViewBox,
    XImg,
    XHeader,
    XNumber,
  },

  data() {
    return {
      IMG_ROOT,
      editing: false,
      checked: [],
      checkall: true,
      showDeleteConfirm: false,
    }
  },

  computed: {
    ...mapState({
      auth: state => state.member.auth,
      added: state => state.cart.added,
      loaded: state => state.cart.loaded,
      inputing: state => state.app.inputing,
    }),
    emptyCart() {
      return _.isEmpty(this.added)
    },
    // 排序，促销在前，不能购买的在后
    addedSort() {
      // _.cloneDeep, state 才不会被直接修改出现警告信息
      return _.sortBy(_.cloneDeep(this.added), (item) => this.canBuy(item) ? (item.prom_id ? 0 : 1) : 2)
    },
    ids() {
      return _.map(this.added, (item) => item.sku_id)
    },
    idsCanBuy() {
      return _.map(_.filter(this.added, (item) => this.canBuy(item)), (item) => item.sku_id)
    },
    idsCntBuy() {
      return _.map(_.filter(this.added, (item) => !this.canBuy(item)), (item) => item.sku_id)
    },
    totalSku() {
      return _.sumBy(this.checked, (id) => {
        let item = _.find(this.added, (item) => item.sku_id == id)
        return parseFloat(item.shop_price) * item.buy_nums
      })
    },
    totalSettle() {
      return _.sumBy(this.checked, (id) => parseFloat(_.find(this.added, (item) => item.sku_id == id).settle_amount))
    },
    totalDiscounted() {
      return _.sumBy(this.checked, (id) => parseFloat(_.find(this.added, (item) => item.sku_id == id).discounted))
    },
    checkedCount() {
      return _.sumBy(this.checked, (id) => parseInt(_.find(this.added, (item) => item.sku_id == id).buy_nums))
    },
    disabledStyle() {
      return _.isEmpty(this.checked) ? {
        color: '#CCC'
      } : {}
    },
  },
  // END computed

  methods: {
    ...mapActions([
      'loadCart',
    ]),
    ...mapMutations([
      'DELETE_FROM_CART', // 映射 this.DELETE_FROM_CART() 为 this.$store.commit('DELETE_FROM_CART', payload)
      'UPDATE_TO_CART'
    ]),
    edit() {
      this.editing = !this.editing
      this.checked = this.editing ? [] : this.idsCanBuy
    },
    deleteSku() {
      if (_.isEmpty(this.checked)) {
        this.$toast('请选择商品')
        return
      }
      this.$messageBox.confirm(`删除商品 ？`, '确认', {
        confirmButtonText: `删除（${_.size(this.checked)}）`
      }).then(() => {
        // 点击删除执行
        let toastDel = this.$toast({
          icon: 'loading',
          message: '正在删除',
          autoHide: false,
        })
        if (this.auth) {
          Api.request({
              url: 'cart/delete',
              method: 'GET',
              params: {
                sku_ids: JSON.stringify(this.checked)
              },
            },
            (res) => {
              this.DELETE_FROM_CART(this.checked)
              this.checked = []
              toastDel.icon = 'success'
              toastDel.message = "删除成功"
              setTimeout(() => {
                toastDel.show = false
              }, 1500)
            },
            (res) => {
              toastDel.icon = 'fail'
              toastDel.iconColor = 'red'
              toastDel.message = "删除失败"
              setTimeout(() => {
                toastDel.show = false
              }, 1500)
            }
          )
        } else {
          LocalCart.delete(this.checked)
          this.DELETE_FROM_CART(this.checked)
          this.checked = []
          toastDel.icon = 'success'
          toastDel.message = "删除成功"
          setTimeout(() => {
            toastDel.show = false
          }, 1500)
        }
      }).catch(err => {
        // 点击取消执行
      })
    },
    //END deleteSku()
    update(sku_id, buy_nums, new_sku_id = null) {
      let params = {
        sku_id,
        buy_nums,
      }
      if (new_sku_id) params.new_sku_id = new_sku_id
      Api.request({
          url: 'cart/update',
          method: 'GET',
          params: params,
        },
        (res) => {
          let newData = _.head(res.data.updated)
          this.UPDATE_TO_CART({sku_id, newData})
          if (!this.auth) {
            LocalCart.update(sku_id, newData)
          }
        },
        (res) => {}
      )
    },
    // END update()
    canBuy(item) {
      return item.is_onsale && item.sku_nums > 0 && item.buy_nums <= item.sku_nums
    },
    tag(item) {
      if (!item.is_onsale) return '下架'
      if (item.sku_nums < 1) return '售罄'
      if (item.sku_nums < item.buy_nums) return '超量'
      if (item.prom_id) return item.prom_name
    },
    tagColor(item) {
      if (!item.is_onsale) return 'gray'
      if (item.sku_nums < 1) return 'gray'
      if (item.sku_nums < item.buy_nums) return 'gray'
      if (item.prom_id) return 'red'
    },
    spec(item) {
      let _spec = ''
      if (!_.isEmpty(item.sku_spec)) {
        for (let i in item.sku_spec) {
          let key = Object.keys(item.sku_spec[i])[0]
          _spec += ` ${key}：${item.sku_spec[i][key]}`
        }
      }
      return _spec
    },
    itemPromInfo(item) {
      let _info = ''
      if (this.canBuy(item)) {
        if (item.gift) _info += '送赠品。'
        if (parseFloat(item.discounted) > 0 ) _info += `立减￥${item.discounted}`
      }
      return _info
    }
  },
  // END methods

  watch: {
    added() {
      // 全选
      if (this.loaded && this.checkall && !this.editing) this.checked = this.idsCanBuy
    },
    checkall() {
      // checkall 与 checked 同时被 watch, 注意按各个状态单独判断与修改，避免陷入死循环
      if (!this.editing) {
        // 反选
        if (!this.checkall && this.checked == this.idsCanBuy) this.checked = []
        // 全选
        if (this.checkall) this.checked = this.idsCanBuy
      } else { // 编辑状态
        if (!this.checkall && this.checked == this.ids) this.checked = []
        if (this.checkall) this.checked = this.ids
      }
    },
    // 监视 checked 变化时更改 checkall 状态
    checked() {
      if (!this.editing) {
        if (this.checked !== this.idsCanBuy && this.checkall) this.checkall = false
        if (this.checked.length === this.idsCanBuy.length) this.checkall = true
      } else { // 编辑状态
        if (this.checked !== this.ids && this.checkall) this.checkall = false
        if (this.checked.length === this.ids.length) this.checkall = true
      }
    },
  },
  // END watch

  mounted() {
    // 路由切换中自动加载购物车，为提升体验，进入购物车使用隐藏加载，即不显示加载状态

    if (this.loaded && this.checkall) {
      this.checked = this.idsCanBuy
    }
  },

}
</script>

<style scoped lang="less">
@import "../../ui/styles/_vars.less";
@import "../../ui/styles/_mixins.less";

.cart-item {
  // 顶部对齐
  align-items: flex-start;
}

.item-left {
    display: flex;
    margin-right: 15px;
    .checkitem {
        height: 190/75rem;
        width: 1.1rem;
        justify-content: flex-start;
    }
}

.item-body {
    .item-name {
        margin-top: 5px;
        color: @black;
        font-size: 14px;
        line-height: 14px;
        height: 14px;
        .ellipsisLn(1);
    }
    .item-spec {
        display: inline-block;
        color: @gray;
        font-size: 12px;
        line-height: 12px;
        overflow: hidden;
        vertical-align: middle;
        &.item-spec-border {
            display: inline-block;
            margin-top: 4px;
            font-size: 12px;
            line-height: 14px;
            padding: 1px 6px;
            border: 1px dotted #DDD;
            border-radius: 8px;
        }
    }
    .item-prom {
        display: inline-block;
        color: @red;
        font-size: 12px;
        line-height: 12px;
        overflow: hidden;
    }
    .price-and-nums {
        display: flex;
        margin-top: 0;
        line-height: 25px;
        height: 25px;
        .price {
            flex: none;
        }
        .nums {
            flex: auto;
            color: @black;
            font-size: 16px;
            text-align: right;
            vertical-align: text-bottom;
        }
    }
}

.bottom {
    width: 100%;
    margin-bottom: 58px;
    line-height: 50px;
    max-height: 50px;
    font-size: 16px;
    font-weight: 600;
    background-color: @dark-white;
    display: flex;
    align-items: center;
    border-top: 1px solid #E7E7E7;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .checkall {
        flex: none;
        text-align: left;
        margin-left: 15px;
        margin-right: 10px;
        label {
          color: @gray;
        }
    }
    .bottom-center {
        flex: 3;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .total {
            color: #000;
            line-height: 25px;
        }
        .total-desc {
            color: @gray;
            font-size: 10px;
            font-weight: normal;
            line-height: 10px;
        }
    }
    .bottom-right {
        flex: 2;
        color: @white;
        text-align: center;
        .checkout {
            width: 100%;
            background-color: @brand;
        }
        .checked-nums {
            font-size: 12px;
        }
        .delete {
          width: 100%;
          background-color: @red;
        }

    }
}

.empty-cart {
  width: 140px;
  text-align: center;
  margin: 50px auto;
  >p {
    color: @brand;
    font-size: 16px;
    line-height: 40px;
    font-weight: 400;
    border-top: 1px solid @brand;
    border-bottom: 1px solid @brand;
  }
}
</style>
