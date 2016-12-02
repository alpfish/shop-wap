<template>
<view-box>
  <x-header slot="header" title="购物车">
    <div slot="right" @click="edit" v-text="editing ? '完成' : '编辑'" style="margin-right: 0.4rem" v-if="!emptyCart"></div>
  </x-header>
  <!-- 订单促销 -->
  <list>
    <list-item line-space="0" height="36px" v-if="orderPromSettle.discount.message">
      <tag slot="left" color="red" :size="12">全场</tag>
      <span class="message" v-html="orderPromSettle.discount.message"></span></list-item>
    <list-item height="36px" v-if="orderPromSettle.give.message" :line="false">
      <tag slot="left" color="red" :size="12">全场</tag>
      <span class="message" v-html="orderPromSettle.give.message"></span></list-item>
    <!-- 订单促销赠品 -->
    <list-item class="cart-item" v-if="orderPromSettle.give.gift" padding="0px 15px 10px 15px" :line="false">
      <div slot="left" class="item-left">
        <checkbox class="checkitem" :value="true" option="gift" disabled></checkbox>
        <x-img tag="赠品" tag-color="red" :src="IMG_ROOT + orderPromSettle.give.gift.thumb" :width="(80/32)+'rem'" :height="(80/32)+'rem'" border :radius="4"></x-img>
      </div>
      <div class="item-body">
        <div class="item-name"><span style="color: red">赠品 </span>{{orderPromSettle.give.gift.sku_name}}</div>
        <div class="price-and-nums">
          <currency :value="0" color="black" size="14px" float-size="14px"></currency>
          <div class="nums">× 1</div></div></div></list-item>
  </list>

  <!-- 商品列表 -->
  <list>
    <list-item v-for="(group, index) of groups" padding="10px 15px 0px 15px" line-space="0 0 0 50px">
      <!-- 组促销 -->
      <list-item class="groups-settle" v-if="groupsProm[index].visible" height="38px" padding="0px 10px" :line="false" arrow>
        <tag slot="left">{{groupsProm[index].tag}}</tag>
        <span class="message">{{groupsProm[index].message}}</span></list-item>
      <!-- 组赠品 -->
      <list-item class="cart-item" v-if="groupsProm[index].gift" padding="0 0 10px 0" :line="false">
        <div slot="left" class="item-left">
          <checkbox class="checkitem" :value="true" option="gift" disabled></checkbox>
          <x-img tag="赠品" tag-color="red" :src="IMG_ROOT + groupsProm[index].gift.thumb" :width="(80/32)+'rem'" :height="(80/32)+'rem'" border :radius="4"></x-img>
        </div>
        <div class="item-body">
          <div class="item-name"><span style="color: red">赠品 </span>{{groupsProm[index].gift.sku_name}}</div>
          <div class="price-and-nums">
            <currency :value="0" color="black" size="14px" float-size="14px"></currency>
            <div class="nums">× 1</div></div></div></list-item>
      <!-- 组商品 -->
      <list-item v-for="item of group" :key="item.sku_id" padding="0 0 10px 0" :line="false">
        <div slot="left" class="item-left">
          <checkbox class="checkitem" v-model="checked" :option="item.sku_id" :disabled="!canBuy(item) && !editing"></checkbox>
          <x-img :tag="CntBuyTag(item)" tag-color="gray" :src="IMG_ROOT + item.sku_thumb" :width="(80/32)+'rem'" :height="(80/32)+'rem'" border :radius="4"></x-img>
        </div>
        <div class="item-body">
          <div class="item-name">{{item.sku_name}}</div>
          <span class="item-spec" :class="{'item-spec-border': editing && spec(item)}" v-text="spec(item)"></span><br>
          <div class="price-and-nums">
            <currency :value="item.shop_price" color="brand" size="14px" float-size="14px"></currency>
            <div class="nums">
              <span v-show="!editing">× {{item.buy_nums}}</span>
              <x-number v-if="editing" v-model="item.buy_nums" ref="xnums" @on-change="update(item.sku_id, item.buy_nums)" :min="1" :max="item.sku_nums" :readonly="!canBuy(item)"></x-number>
            </div>
          </div>
        </div>
      </list-item>
    </list-item>
  </list>
  <!-- END 商品列表 -->

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
        合计：<currency :value="cartSettle.settle_amount" size="16px" float-size="16px" color="black">
      </div>
      <div class="total-desc" v-if="!editing">
        <currency :value="cartSettle.sku_amount" size="10px" float-size="10px" color="gray-light-extra"></currency>
        <b>&nbsp;－&nbsp;</b><currency :value="cartSettle.discounted" size="10px" float-size="10px" color="gray-light-extra"></currency>
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
import CartSettle from 'src/mixins/cart-settle'

import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'
import {
  IMG_ROOT
} from 'src/config'
import {
  Checkbox,
  Currency,
  Icon,
  List,
  ListItem,
  Tag,
  ViewBox,
  XImg,
  XHeader,
  XNumber,
} from 'ui/components'

export default {
  mixins: [CartSettle],
  components: {
    Checkbox,
    Currency,
    Icon,
    List,
    ListItem,
    Tag,
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
    ids() {
      return _.map(this.added, (item) => item.sku_id)
    },
    idsCanBuy() {
      return _.map(_.filter(this.added, (item) => this.canBuy(item)), (item) => item.sku_id)
    },
    idsCntBuy() {
      return _.map(_.filter(this.added, (item) => !this.canBuy(item)), (item) => item.sku_id)
    },
    checkedCount() {
      // return _.sumBy(this.checked, (id) => parseInt(_.find(this.added, (item) => item.sku_id == id).buy_nums))
      return _.toString(this.checked.length)
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
      'UPDATE_TO_CART',
      'SET_CART_CHECKED',
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

    spec(item) {
      let _spec = ''
      if (!_.isEmpty(item.sku_spec)) {
        for (let i in item.sku_spec) {
          let key = Object.keys(item.sku_spec[i])[0]
          // _spec += ` ${key}：${item.sku_spec[i][key]}`
          _spec += ` ${this.editing ? key + ':' : ''}${item.sku_spec[i][key]}`
        }
      }
      return _spec
    },
    CntBuyTag(item) {
      if (!item.is_onsale) return '下架'
      if (item.sku_nums < 1) return '售罄'
      if (item.sku_nums < item.buy_nums) return '超量'
    },
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
    checked(val) {
      if (!this.editing) {
        if (this.checked !== this.idsCanBuy && this.checkall) this.checkall = false
        if (this.checked.length === this.idsCanBuy.length) this.checkall = true
        this.SET_CART_CHECKED(val)
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
@import "./style.less";
</style>
