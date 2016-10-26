<!-- cart.list -->
<template>
<view-box class="cart">
  <x-header back title="购物车">
    <button @click="edit" :text="editing ? '完成' : '编辑'" slot="right"></button>
  </x-header>
  <!-- 列表 -->
  <list v-if="loaded" item-height="230/75rem" bgcolor="#DDD" item-padding="0 0.4rem 0 0" gutter="0px" :line="false" :item-line="true" item-line-space="0 0 0 1.46rem">
    <list-item v-for="item of added" bgcolor="#FFF">
      <div slot="left" class="item-left">
        <checkbox class="checkitem" :value.sync="checked" :option="item.sku_id" :disabled="!canBuy(item) && !editing"></checkbox>
        <x-img :tag="tag(item)" :tag-color="tagColor(item)" :src="IMG_ROOT + item.sku_thumb" :width="(190/75)+'rem'" :height="(190/75)+'rem'" border></x-img>
      </div>
      <div slot="body" class="item-body">
        <div class="name" v-text="item.sku_name"></div>
        <div class="spec-wrap"><div class="spec" :class="{'spec-border':editing}" v-if="spec(item)" v-text="spec(item)"></div><div></div></div>
        <div class="item-prom-wrap"><div class="item-prom-border" v-if="itemPromInfo(item)" v-text="itemPromInfo(item)"></div><div></div></div>
        <div class="price-and-nums">
          <currency :value="item.shop_price" color="black" :size="32" :float-size="28"></currency>
          <div class="nums">
            <span v-show="!editing">× {{item.buy_nums}}&nbsp;</span>
            <div v-show="editing"><x-number :value="item.buy_nums" v-ref:xnums @on-change="update(item.sku_id, $refs.xnums.value)" :min="1" :max="item.sku_nums" :disabled="!canBuy(item)"></x-number></div>
          </div>
        </div>
      </div>
    </list-item>
  </list>
  <!-- 底部 -->
  <div slot="bottom" class="bottom" v-show="showBottom">
    <div class="checkall">
      <checkbox :value.sync="checkall" option="all" label="全选"></checkbox>
    </div>
    <div class="bottom-center">
      <div class="total" v-if="!editing">
        合计:&nbsp;
        <currency :value="totalSettle" :size="36" :float-size="36" color="black">
      </div>
      <div class="total-desc" v-if="!editing">
        总计:
        <currency :value="totalSku" :size="22" :float-size="22" color="gray-light-extra"></currency>&nbsp; 立减:
        <currency :value="totalDiscounted" :size="22" :float-size="22" color="gray-light-extra"></currency>
      </div>
    </div>
    <div class="bottom-right" :style="disabledStyle">
      <span class="checkout" v-if="!editing">去结算<span class="checked-nums">（{{checkedCount}}）</span></span>
      <span class="delete" v-if="editing" @click="confirmDelete">批量删除</span>
    </div>
  </div>
  <tabbar slot="bottom" v-show="showBottom"></tabbar>
  <loading :show="!loaded"></loading>
  <confirm :show.sync="showDeleteConfirm" @on-confirm="doDelete" title="删除所选的商品?" cancel-text="取消" confirm-text="删除"></confirm>
</view-box>
</template>

<script>
import {
  Button,
  Checkbox,
  Confirm,
  Currency,
  Loading,
  List,
  ListItem,
  ViewBox,
  XImg,
  XHeader,
  XNumber,
} from 'ui/components'
import Tabbar from 'components/tabbar'
import {
  IMG_ROOT
} from 'src/config'
import {
  loadCart,
  update,
  deleteCartSkus,
} from 'actions/cart'
import {
  auth,
  cartAdded,
  cartLoaded,
} from 'src/vuex/getters'

export default {
  components: {
    Button,
    Checkbox,
    Confirm,
    Currency,
    Loading,
    List,
    ListItem,
    ViewBox,
    Tabbar,
    XImg,
    XHeader,
    XNumber,
  },
  data() {
    return {
      IMG_ROOT,
      editing: false,
      checked: [],
      checkall: ['all'],
      showBottom: true,
      showDeleteConfirm: false,
    }
  },
  computed: {
    added: cartAdded,
    loaded: cartLoaded,
    auth,
    // 排序，促销在前，不能购买的在后
    // addedSort() {
    //   return _.sortBy(this.added, (item) => this.canBuy(item) ? (item.prom_id ? 0 : 1) : 2)
    // },
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
  methods: {
    canBuy(item) {
      return item.is_onsale && item.sku_nums > 1 && item.buy_nums <= item.sku_nums
    },
    confirmDelete() {
      if (_.isEmpty(this.checked)) {
        this.$vux.toast.show({
          text: '请选中后再删除',
          type: 'text',
          width: '5rem',
        })
      } else {
        this.showDeleteConfirm = true
      }
    },
    doDelete() {
      this.deleteCartSkus(this.checked)
      this.checked = []
      this.$vux.toast.show({
        text: '删除成功',
        type: 'text',
      })
    },
    edit() {
      this.editing = !this.editing
      this.checked = this.editing ? [] : this.idsCanBuy
    },
    tag(item) {
      if (!item.is_onsale) return '已下架'
      if (item.sku_nums < 1) return '已售罄'
      if (item.sku_nums < item.buy_nums) return '超量购买'
      if (item.prom_id) return '促销中'
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
          _spec += `${key}：${item.sku_spec[i][key]}　`
        //   _spec += `${item.sku_spec[i][key]}　`
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
  watch: {
    added() {
      // 全选
      if (_.isEmpty(this.checked) && !this.editing) this.checked = this.idsCanBuy
    },
    checkall() {
      // checkall 与 checked 同时被 watch, 注意按各个状态单独判断与修改，避免陷入死循环
      if (!this.editing) {
        if (_.isEmpty(this.checkall) && this.checked === this.idsCanBuy) this.checked = []
        if (!_.isEmpty(this.checkall)) this.checked = this.idsCanBuy
      } else { // 编辑状态
        if (_.isEmpty(this.checkall) && this.checked === this.ids) this.checked = []
        if (!_.isEmpty(this.checkall)) this.checked = this.ids
      }
    },
    // 监视 checked 变化时更改 checkall 状态
    checked() {
      if (!this.editing) {
        if (this.checked !== this.idsCanBuy && !_.isEmpty(this.checkall)) this.checkall = []
        if (this.checked.length === this.idsCanBuy.length) this.checkall = ['all']
      } else { // 编辑状态
        if (this.checked !== this.ids && !_.isEmpty(this.checkall)) this.checkall = []
        if (this.checked.length === this.ids.length) this.checkall = ['all']
      }
    },
  },
  vuex: {
    getters: {
      // added: ({cart}) => cart.added
    },
    actions: {
      loadCart,
      update,
      deleteCartSkus,
    }
  },
  ready() {
    // 加载列表
    this.loadCart()
    // 输入数量时隐藏底部
    const cWidth = document.body.clientWidth
    const cHeight = document.body.clientHeight
    window.onresize = () => {
      let width = document.body.clientWidth
      let height = document.body.clientHeight
      this.showBottom = height < cHeight && width == cWidth ? false : true // 宽度改变代表横坚屏切换
    }
  },
}
</script>
<style scoped lang="less">@import "../../ui/styles/index.less";
.cart {
    .item-body,
    .item-left {
        display: flex;
        min-height: 230/75rem;
        max-height: 230/75rem;
        padding: 20/75rem 0;
        .checkitem {
            height: 230/75rem;
            width: 110/75rem;
            justify-content: flex-start;
            padding-left: 30/75rem;
        }
    }

    .item-body {
        margin-left: 20/75rem;
        width: 100%;
        position: relative;
        flex-direction: column;
        justify-content: center;
        .name {
            margin-top: 12/75rem;
            color: @black;
            font-size: 30/75rem;
            line-height: 36/75rem;
            height: 36/75rem;
            font-weight: normal;
            .ellipsisLn(1);
        }
        .spec-wrap {
            display: flex;
            margin-top: 6/75rem;
            height: 32/75rem;
            .spec {
                flex: none;
                color: @gray;
                font-size: 24/75rem;
                line-height: 24/75rem;
                height: 32/75rem;
                .ellipsisLn(1);
                &.spec-border {
                    padding: 4px 10px;
                    border: 1px dashed @black;
                    border-radius: 16/75rem;
                }
            }
        }
        .item-prom-wrap {
            display: flex;
            margin-top: 10/75rem;
            height: 32/75rem;
            .item-prom-border {
                flex: none;
                padding: 4px 10px;
                color: @red;
                font-size: 24/75rem;
                line-height: 24/75rem;
                height: 32/75rem;
                border: 1px solid @red;
                border-radius: 16/75rem;
                .ellipsisLn(1);
            }
        }
        .price-and-nums {
            display: flex;
            margin-top: 10/75rem;
            position: relative;
            line-height: 56/75rem;
            height: 56/75rem;
            width: 100%;
            .nums {
                position: absolute;
                right: 0;
                bottom: 0;
                color: @black;
                font-size: 16*2/75rem;
            }
        }
    }

    .bottom {
        width: 100%;
        margin-bottom: 110/75rem;
        line-height: 100/75rem;
        max-height: 100/75rem;
        font-size: 36/75rem;
        font-weight: 600;
        border-top: 1px solid @gray-light-extra;
        background-color: @dark-white;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        z-index: 2;
        div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .checkall {
            flex: none;
            text-align: left;
            margin-left: 30/75rem;
            margin-right: 30/75rem;
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
                line-height: 50/75rem;
            }
            .total-desc {
                color: @gray;
                font-size: 22/75rem;
                font-weight: normal;
                line-height: 22/75rem;
            }
        }
        .bottom-right {
            flex: 2;
            color: @white;
            background-color: @red;
            text-align: center;
            .checkout {
                width: 100%;
            }
            .checked-nums {
                font-size: 24/75rem;
            }

        }
    }
}
</style>
