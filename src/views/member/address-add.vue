<template>
  <editor title="添加地址" @on-save="save" :data="initData"></editor>
</template>

<script>
import Api from 'libs/api'
import Editor from 'components/member/address-editor'

import { fetchAddresses, setAddress, selectAddress } from 'actions/member'

export default {
  components: {
    Editor,
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

  computed: {
    initData() {
      return {
        name: null,
        mobile: null,
        district_id: null,
        address: null,
        isdefault: !this.hasDefault,
      }
    },

    hasDefault () {
      return !!_.find(this.addresses, { 'isdefault': true })
    }
  },

  methods: {
    save(data) {
      Api.request (
        {
          url: 'member/address/edit',
          method: 'GET',
          params: { data: JSON.stringify(data) },
        },
        (res) => {
          this.setAddress([res.data.edited])
          if (!this.selectedId){
            this.selectAddress(res.data.edited.id)
          }
          window.history.back()
        },
        (res) => {}
      )
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

</style>
