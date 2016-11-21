<template>
  <view-box style="background-color: #fff;">
    <x-header back title="登录"></x-header>
    <cells>
      <textfield v-model="account" label="会员" placeholder="手机号/会员名"></textfield>
      <textfield v-model="password" label="密码" placeholder="请输入密码" type="password"></textfield>
    </cells>
    <div style="margin: 15px;">
      <x-button @click.native="login" fill color="brand" :disabled="loading">
        {{ loading ? '登录中 ...' : '登录' }}
      </x-button>
    </div>
  </view-box>
</template>

<script>
import Api from 'src/libs/api'
import Validator from 'src/libs/validator'
import { mapState, mapMutations } from 'vuex'
import { Cells, Cell, Textfield, ViewBox, XButton, XHeader } from 'ui/components'

export default {
  components: {
    Cells,
    Cell,
    Textfield,
    ViewBox,
    XButton,
    XHeader,
  },

  data() {
    return {
      redirect: decodeURIComponent(this.$route.query.redirect || '/'),
      account: '',
      password: '',
      loading: false,
    }
  },

  computed: {
    ...mapState([
      'member',
    ]),
  },

  methods: {
    ...mapMutations([
      'SET_AUTH', // 映射 this.SET_AUTH() 为 this.$store.commit('SET_AUTH', payload)
      'CANCEL_AUTH'
    ]),
    login() {
      if (this.accountValid().faild || this.passwordValid().faild) return
      this.loading = true
      Api.request (
        {
          url: 'member/login',
          method: 'POST',
          params: {
            account: this.account,
            password: this.password
          }
        },
        (res) => {
          // TOKEN 已在 Api.request() 中被截取并缓存, 故这里不再处理
          this.SET_AUTH(res.data.member)
          // TODO 同步购物车
          this.loading = false
          this.$toast('登录成功')
          this.$router.push(this.redirect)
        },
        (res) => {
          this.CANCEL_AUTH()
          this.loading = false
          if (res.data && res.data.errors) {
            let errors = res.data.errors
            if (errors.password) {
              this.$toast(errors.password[0])
            } else {
              if (errors.username) this.$toast(errors.username[0])
              if (errors.mobile) this.$toast(errors.mobile[0])
              if (errors.email) this.$toast(errors.email[0])
            }
          } else {
            this.$toast('连接超时，请稍后再试。')
          }
        }
      )
    },
    // END login()

    accountValid() {
      let v = Validator.validate({
          value: this.account,
          rules: 'required',
          errors: '请输入帐号'
       })
       if (v.error) this.$toast(v.error)
       return v
    },
    passwordValid() {
      let v = Validator.validate({
          value: this.password,
          rules: 'required|min_length(6)|max_length(20)',
          errors: '请输入密码|密码长度最少6位|密码长度不能超过20位'
       })
       if (v.error) this.$toast(v.error)
       return v
    }
  },
  // END methods

  mounted() {
    if (this.member.auth) {
      this.$router.push(this.redirect)
    }
  }

}
</script>
