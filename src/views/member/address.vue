<!-- Home -->
<template>
<view-box  style="background-color: #fff;">
  <x-header back title="地址管理"></x-header>
  <list>
    <list-item @click="select(address.id)" v-for="address in addresses" track-by="$index" padding="0.4rem" line-space="0.4rem"  :class="{'selected': selectedId == address.id}">
      <div slot="left" class="address-left">
        <h3>{{ address.name }}</h3><span v-if="address.isdefault">默认</span>
      </div>
      <div class="address-body">
        <h3>{{ address.mobile }}</h3>
        <p>{{ address.district }}{{ address.address }}</p>
      </div>
      <icon slot="right" class="address-right" @click="onEdit(address)" name="bianji" color="semi" :size="36"></icon>
    </list-item>
  </list>
  <div slot="bottom" style="margin: 30px">
    <x-button @click="clickAdd" v-show="!editing" color="red" fill><icon name="add" :size="36"></icon>新建地址<x-button>
  </div>
</view-box>
<editor v-if="editing" :data="editData" @on-save="update" title="编辑地址" close @on-close="editing = false"></editor>
</template>

<script>
import Api from 'libs/api'
import Editor from 'components/member/address-editor'
import { fetchAddresses, setAddress, selectAddress } from 'actions/member'
import {
  ViewBox,
  Icon,
  List,
  ListItem,
  XHeader,
  XButton,
} from 'ui/components'

export default {
  components: {
    Editor,
    ViewBox,
    Icon,
    List,
    ListItem,
    XHeader,
    XButton,
  },

  data() {
    return {
      editing: false,
      editData: null,
    }
  },

  vuex: {
    getters: {
      addresses: ({member}) => member.addresses,
      selectedId: ({member}) => member.selectedAddressId,
    },
    actions: {
      fetchAddresses,
      setAddress,
      selectAddress,
    }
  },

  methods: {

    onEdit(address) {
      this.editData = _.clone(address)
      this.editing = true
    },

    update() {
      this.editing = false
      if (_.isEqual(this.editData, _.find(this.addresses, {'id': this.editData.id}))) {
        return
      }
      Api.request (
        {
          url: 'member/address/edit',
          method: 'GET',
          params: { data: JSON.stringify(this.editData) },
        },
        (res) => {
          this.setAddress([res.data.edited])
        },
        (res) => {}
      )
    },

    select(id) {
      this.selectAddress(id)
      // TODO 选择地址后是否返回，如果不是点击地址管理（从用户中心）来，就返回
      // window.history.back()
    },

    clickAdd() {
      if (this.addresses.length < 5) {
        this.$router.go({name: 'address-add'})
      } else {
        this.$vux.toast.show({
          text: '您有5个地址，请编辑现有地址使用哦。',
          type: 'text',
        })
      }
    }
  },

  ready() {
    if (_.isEmpty(this.addresses)) {
      this.fetchAddresses()
    }
  },

}
</script>

<style scoped lang="less">
@import '../../ui/styles/_vars.less';

.address-left {
  text-align: center;
  min-width: 120/75rem;
  h3 {
    color: @black;
    font-size: 30/75rem;
    margin-bottom: 0px;
  }
  span {
    color: @red;
    font-size: 20px;
    line-height: 24px;
    padding: 2px 8px;
    border: 1px solid @red;
    border-radius: 4px;
  }
}

.address-right {
  width: 30/75rem;
  margin-right: 20/75rem;
}

.address-body {
  text-align: left;
  margin: 0 30/75rem;
  span {
    color: @red;
    font-size: 20px;
    line-height: 24px;
    padding: 2px 8px;
    border: 1px solid @red;
    border-radius: 4px;
  }
  h3 {
    color: @black;
    font-size: 28/75rem;
  }
  p {
    margin: 10px 0 0 0;
    font-size:26/75rem;
    line-height: 36/75rem;
  }
}

&.selected {
  border-left: 4px solid @red;
}
</style>
