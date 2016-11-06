<!-- cart.list -->
<template>
<view-box>
  <x-header slot="header" title="购物车">
    <div slot="right" @click="edit" v-text="editing ? '完成' : '编辑'" style="margin-right: 0.4rem"></div>
  </x-header>

  <!-- 列表 -->
  <loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
    <list track-by="sku_id" bgcolor="#DDD" gutter="0px" >
      <list-item v-for="item of addedSort" height="230/75rem" padding="0.4rem" line-space="0 0 0 1.5rem" bgcolor="#FFF">
        <div slot="left" class="item-left">
          <checkbox class="checkitem" :value.sync="checked" :option="item.sku_id" :disabled="!canBuy(item) && !editing"></checkbox>
          <x-img :tag="tag(item)" :tag-color="tagColor(item)" :src="IMG_ROOT + item.sku_thumb" :width="(190/75)+'rem'" :height="(190/75)+'rem'" border></x-img>
        </div>
        <div class="item-body">
          <span class="item-name" v-text="item.sku_name"></span>
          <span class="item-spec" :class="{'item-spec-border': editing && spec(item)}" v-text="spec(item)"></span><br>
          <span class="item-prom" :class="{'item-prom-border':itemPromInfo(item)}" v-text="itemPromInfo(item)"></span><br>
          <div class="price-and-nums">
            <currency :value="item.shop_price" color="black" :size="32" :float-size="28"></currency>
            <div class="nums">
              <span v-show="!editing">× {{item.buy_nums}}&nbsp;</span>
              <x-number v-if="editing" :value="item.buy_nums" v-ref:xnums @on-change="update(item.sku_id, $refs.xnums.value)" :min="1" :max="item.sku_nums" :disabled="!canBuy(item)"></x-number>
            </div>
          </div>
        </div>
      </list-item>
    </list>
  </loadmore>

  <!-- 底部 -->
  <div slot="bottom" class="bottom" v-show="!inputing">
    <div class="checkall">
      <checkbox :value.sync="checkall" option="全选" label="全选"></checkbox>
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

  <confirm :show.sync="showDeleteConfirm" @on-confirm="doDelete" title="删除所选的商品?" cancel-text="取消" confirm-text="删除"></confirm>
</view-box>
</template>

<script>

import {
  Checkbox,
  Confirm,
  Currency,
  Loading,
  List,
  ListItem,
  Loadmore,
  ViewBox,
  XImg,
  XHeader,
  XNumber,
} from 'ui/components'
import {
  IMG_ROOT
} from 'src/config'
import {
  update,
  deleteCartSkus,
} from 'actions/cart'
import {
  auth,
} from 'src/vuex/getters'

export default {

  components: {
    Checkbox,
    Confirm,
    Currency,
    List,
    ListItem,
    Loadmore,
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

  vuex: {
    getters: {
      added: ({cart}) => cart.added,
      loaded: ({cart}) => cart.loaded,
      inputing: ({app}) => app.inputing,
    },
    actions: {
      update,
      deleteCartSkus,
    }
  },

  computed: {
    auth,
    // 排序，促销在前，不能购买的在后
    addedSort() {
      return _.sortBy(this.added, (item) => this.canBuy(item) ? (item.prom_id ? 0 : 1) : 2)
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

  methods: {
    loadTop(id) {
      setTimeout(() => {
        this.$broadcast('onTopLoaded', id);
      }, 1000);
    },
    loadBottom(id) {
      setTimeout(() => {
        this.$broadcast('onBottomLoaded', id);
      }, 1000);
    },
    edit: _.throttle (function() {
        this.editing = !this.editing
        this.checked = this.editing ? [] : this.idsCanBuy
    }, 2000),
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
    tag(item) {
      if (!item.is_onsale) return '已下架'
      if (item.sku_nums < 1) return '已售罄'
      if (item.sku_nums < item.buy_nums) return '超量购买'
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

  ready() {
    // 路由切换中自动加载购物车，为提升体验，进入购物车使用隐藏加载，即不显示加载状态

    if (this.loaded && this.checkall) {
      this.checked = this.idsCanBuy
    }
  }

}
</script>
<style scoped lang="less">@import "../../ui/styles/index.less";
.item-left {
    display: flex;
    margin-right: 20/75rem;
    .checkitem {
        height: 190/75rem;
        width: 1.1rem;
        justify-content: flex-start;
    }
}

.item-body {
    .item-name {
        margin-top: 6/75rem;
        color: @black;
        font-size: 30/75rem;
        line-height: 36/75rem;
        height: 36/75rem;
        .ellipsisLn(1);
    }
    .item-spec {
        display: inline-block;
        color: @gray;
        font-size: 24/75rem;
        line-height: 24/75rem;
        height: 28/75rem;
        overflow: hidden;
        &.item-spec-border {
            height: 32/75rem;
            padding: 4px 10px;
            border: 1px dashed @black;
            border-radius: 16/75rem;
        }
    }
    .item-prom {
        display: inline-block;
        color: @red;
        font-size: 24/75rem;
        line-height: 24/75rem;
        height: 32/75rem;
        overflow: hidden;
        &.item-prom-border {
            padding: 4px 10px;
            border: 1px solid @red;
            border-radius: 16/75rem;
        }
    }
    .price-and-nums {
        display: flex;
        margin-top: 0/75rem;
        line-height: 50/75rem;
        height: 50/75rem;
        .price {
            flex: none;
        }
        .nums {
            flex: auto;
            color: @black;
            font-size: 16*2/75rem;
            text-align: right;
            vertical-align: text-bottom;
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
    border-top: 1px solid @border-color;
    background-color: @dark-white;
    display: flex;
    align-items: center;
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
</style>
