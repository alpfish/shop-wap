<!-- Home -->
<template>
<view-box>
  <x-header back title="地址管理"></x-header>

  <cells>
    <cell class="address-item" @click="select(address.id)" v-for="address in addresses" track-by="$index" :class="{'selected': selectedId == address.id}">
      <div slot="left" class="left">
        <span class="name">{{ address.name }}</span>
        <span class="default" v-if="address.isdefault">默认</span>
      </div>
      <div class="body">
        <span class="mobile">{{ address.mobile }}</span>
        <p class="detail">{{ address.district }}{{ address.address }}</p>
      </div>
      <icon slot="right" class="right" @click.native="onEdit(address)" name="bianji" color="gray" :size="18"></icon>
    </cell>
  </cells>

  <div slot="bottom" style="margin: 15px">
    <x-button @click.native="clickAdd" v-show="!editing" color="brand" fill><icon name="add" :size="20"></icon>新建地址<x-button>
  </div>

  <editor v-if="editing" :data="editData" @on-save="update" title="修改地址" close @on-close="editing = false"></editor>
</view-box>
</template>

<script>
import Api from 'src/libs/api'
import Editor from 'src/components/member/address-editor'
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  Cell,
  Cells,
  Icon,
  ViewBox,
  XHeader,
  XButton,
} from 'ui/components'

export default {
  components: {
    Cell,
    Cells,
    Editor,
    Icon,
    ViewBox,
    XHeader,
    XButton,
  },

  data() {
    return {
      editing: false,
      editData: null,
    }
  },

  computed: {
    ...mapState({
      addresses: ({member}) => member.addresses,
      selectedId: ({member}) => member.selectedAddressId,
    }),
  },

  methods: {
    ...mapMutations([
      'SET_ADDRESSES', // this.SET_ADDRESSES(data) === this.$store.commit('SET_ADDRESSES', data)
      'SELECT_ADDRESS'
    ]),
    ...mapActions([
      'fetchAddresses'
    ]),

    onEdit(address) {
      this.editData = address
      this.editing = true
    },

    update(data) {
      this.editing = false
      let newData = _.merge(_.clone(this.editData), data)
      if (_.isEqual(newData, _.find(this.addresses, {'id': newData.id}))) return
      let toast = this.$toast({
        icon: 'loading',
        message: '正在保存',
        autoHide: false,
      })
      Api.request (
        {
          url: 'member/address/edit',
          method: 'GET',
          params: { data: JSON.stringify(newData) },
        },
        (res) => {
          this.SET_ADDRESSES([res.data.edited])
          toast.icon = 'success'
          toast.message = "修改成功"
          setTimeout(() => {
            toast.show = false
          }, 1500)
        },
        (res) => {
          toast.icon = 'fail'
          toast.iconColor = 'red'
          toast.message = "稍后再试"
          setTimeout(() => {
            toast.show = false
          }, 1500)
        }
      )
    },

    select(id) {
      this.SELECT_ADDRESS(id)
    },

    clickAdd() {
      if (this.addresses.length < 5) {
        this.$router.push({path: '/add-address'})
      } else {
        this.$toast('最多5个地址，可编辑使用哦')
      }
    }
  },

  mounted() {
    if (_.isEmpty(this.addresses)) {
      this.fetchAddresses()
    }
  },

}
</script>

<style scoped lang="less">
@import '../../ui/styles/_vars.less';

.address-item {
  // border-left: 3px solid @brand;
  min-height: 80px;
  .left {
    text-align: left;
    width: 70px;
    line-height: 14px;
    .name {
      display: block;
      color: @black;
      font-size: 14px;
    }
    .default {
      text-align: center;
      color: @red;
      font-size: 10px;
      padding: 1px 2px;
      border: 1px solid @red;
      border-radius: 2px;
    }
  }

  .right {
    margin-left: 15px;
  }

  .body {
    text-align: left;
    // padding: 10px;
    .mobile {
      display: block;
      color: @semi;
      font-size: 14px;
    }
    .detail {
      color: #666;
      margin: 0;
      font-size: 12px;
      line-height: 16px;
    }
  }
}


&.selected {
  border-left: 1px solid @red;
}
</style>
