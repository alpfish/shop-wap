<!-- cart.list -->
<template>
<view-box class="cart">
  <x-header back :title="'购物车('+checked.length+')'">
    <button @click="edit" :text=" editing ? '完成' : '编辑'" slot="right"></button>
  </x-header>
  <loading :show="!loaded"></loading>
  <!-- 列表 -->
  <list v-if="loaded" item-padding="0" gutter="1px" item-height="100/64rem" :line="false" :item-line="false" item-line-space="0 10px" bgcolor="#EEE">
    <list-item v-for="item of added" bgcolor="#FFF">
      <div slot="left" class="item-left">
        <checkbox class="checkitem" :value.sync="checked" :option="item.id + ''"></checkbox>
        <img :src="IMG_ROOT + item.sku_thumb">
      </div>
      <div slot="body" class="item-body" v-if="!editing">
        <h3 v-text="item.sku_name"></h3>
        <br>
        <div>
          <currency :value="item.prom_price" color="black"></currency>
        </div>
      </div>
      <div slot="body" v-if="editing">
        <x-number :value="item.buy_nums" :min="1" :max="item.sku_nums" :border="true"></x-number>
      </div>
      <div slot="right" class="item-right" v-if="editing">删除</div>
    </list-item>
  </list>

  <!-- <br>ids: {{ ids }}
  <br>checked: {{ checked }}
  <br>checkall: {{ checkall }} -->
  <div slot="bottom" class="bottom">
    <div class="checkall">
      <checkbox :value.sync="checkall" option="all" label="全选"></checkbox>
    </div>
    <div class="total">
      合计:
      <currency :value="total"></currency>
    </div>
    <div class="checkout">去结算({{checked.length}})</div>
  </div>
</view-box>
</template>

<script>
import {
  Button,
  Checkbox,
  Currency,
  Loading,
  List,
  ListItem,
  ViewBox,
  XHeader,
  XNumber,
} from 'ui/components'
import {
  IMG_ROOT
} from 'src/config'
import {
  loadCart
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
    Currency,
    Loading,
    List,
    ListItem,
    ViewBox,
    XHeader,
    XNumber,
  },
  data() {
    return {
      IMG_ROOT,
      checked: [],
      checkall: ['all'],
      editing: false,
    }
  },
  computed: {
    added: cartAdded,
    loaded: cartLoaded,
    auth,
    ids() {
      return this.added ? Object.keys(this.added) : []
    },
    total() {
      let total = 0
      for (let key in this.checked) {
        let id = this.checked[key]
        total += parseFloat(this.added[id].prom_price)
      }
      return total
    }
  },
  vuex: {
    getters: {},
    actions: {
      loadCart,
    }
  },
  methods: {
    edit() {
      this.editing = !this.editing
    },
  },
  watch: {
    loaded() {
      if (!_.isEmpty(this.checkall)) {
        this.checked = this.ids
      }
    },
    checkall() {
      // checkall 与 checked 同时被 watch, 注意按各个状态单独判断与修改，避免陷入死循环
      if (_.isEmpty(this.checkall) && this.checked === this.ids) {
        this.checked = []
      }
      if (!_.isEmpty(this.checkall)) {
        this.checked = this.ids
      }
    },
    checked() {
      if (this.checked !== this.ids && !_.isEmpty(this.checkall)) {
        this.checkall = []
      }
      if (this.checked.length === this.ids.length) {
        this.checkall = ['all']
      }
    },

  },
  ready() {
    this.loadCart()
  },
}
</script>
<style scoped lang="less">@import "../../ui/styles/index.less";
.cart {
    .item-body,
    .item-left,
    .item-right {
        display: flex;
        height: 100/64rem;
        padding: 10/64rem 0;
    }
    .item-left {
        .checkitem {
            width: 40/64rem;
            justify-content: center;
        }
        img {
            max-width: 80/64rem;
            max-height: 80/64rem;
        }
    }
    .item-body {
        margin-left: 10px;
        margin-right: 10px;
        width: 100%;
        flex-direction: column;
        h3 {
            color: @black;
            font-size: 13/64rem;
            line-height: 18/64rem;
            height: 18/64rem;
            .ellipsisLn(1);
        }
    }
    .item-right {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 14vw;
        margin-left: 5px;
        background-color: @red;
        font-size: 14px;
        color: @white;
    }
    .bottom {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 50px;
        font-size: 16px;
        color: @gray;
        background-color: #FAFAFA;
        border-top: 1px solid @dark-white;
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
        }
        .checkall {
            flex: none;
            width: 21vw;
            text-align: center;
        }
        .total {
            flex: 3;
            justify-content: flex-end;
            padding: 5px 10px;
            line-height: 24px;
        }
        .checkout {
            flex: 2;
            font-weight: 600;
            color: @white;
            background-color: @red;
        }
    }
}
</style>
