<template>
  <editor title="添加地址" @on-save="save" :data="initData"></editor>
</template>

<script>
import Api from 'src/libs/api'
import Editor from 'src/components/member/address-editor'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    Editor,
  },

  computed: {
    ...mapState({
      addresses: ({member}) => member.addresses,
      selectedId: ({member}) => member.selectedAddressId,
    }),
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
    ...mapMutations([
      'SET_ADDRESSES', // this.SET_ADDRESSES(data) === this.$store.commit('SET_ADDRESSES', data)
      'SELECT_ADDRESS'
    ]),
    ...mapActions([
      'fetchAddresses'
    ]),
    save(data) {
      let toast = this.$toast({
        icon: 'loading',
        message: '正在保存',
        autoHide: false,
      })

      Api.request (
        {
          url: 'member/address/edit',
          method: 'GET',
          params: { data: JSON.stringify(data) },
        },
        (res) => {
          this.SET_ADDRESSES([res.data.edited])
          if (!this.selectedId){
            this.SELECT_ADDRESS(res.data.edited.id)
          }
          toast.icon = 'success'
          toast.message = "添加成功"
          setTimeout(() => {
            toast.show = false
            if (this.$route.query.redirect) {
              this.$router.push(decodeURIComponent(this.$route.query.redirect))
            }
            this.$router.back()
          }, 1500)
        },
        (res) => {
          toast.icon = 'fail'
          toast.iconColor = 'red'
          toast.message = "添加失败"
          setTimeout(() => {
            toast.show = false
          }, 1500)
        }
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
