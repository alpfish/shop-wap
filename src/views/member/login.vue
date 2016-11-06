<template>
<view-box style="background-color: #fff;">
  <x-header back title="会员登录">
  </x-header>
  <textfield type='text' icon="zhanghao" label="手机号/会员名" label-float
    :value.sync="account.value"
    :rules="account.rules"
    :errors="account.errors"
    :passed.sync="account.passed"></textfield>
  <textfield type='password' icon="mima" label="密码" label-float
    :value.sync="password.value"
    :rules="password.rules"
    :errors="password.errors"
    :passed.sync="password.passed"></textfield>

  <div style="margin: 30px;">
    <x-button fill raised
      @click="login"
      color="brand"
      :disabled="loading || !canLogin"
      :text="loading ? '登录中 ...' : '登录'">
    </x-button>
  </div>

  <!-- <button-row>
    <button mini @click="register">注册新会员</button>
    <button mini>忘记密码</button>
  </button-row> -->

  <toast :show.sync="success" type="success" text="登录成功"></toast>
  <toast :show.sync="fail" type="text" :text="failMsg"></toast>
</view-box>

</template>

<script>
import {ViewBox, XHeader, XButton, Textfield, Toast} from 'ui/components'
import {login} from 'actions/member'

export default {
  components: {
    ViewBox,
    XHeader,
    Textfield,
    XButton,
    Toast,
  },
  data() {
    return {
      account: {
        value: '',
        rules: 'required',
        errors: '请输入帐号。',
        passed: false,
      },
      password: {
        value: '',
        rules: 'required|min_length(6)|max_length(20)',
        errors: '请输入密码。|密码长度最少6位。|密码长度不能超过20位。',
        passed: false,
      },
      loading: false,
      success: false,
      fail: false,
      failMsg: '',
    }
  },
  computed: {
    canLogin() {
      return this.account.passed && this.password.passed && !this.loading ? true : false
    },
  },
  vuex: {
    getters: {
      auth: ({member}) => member.auth,
    },
    actions: {
      ajaxLogin: login
    }
  },
  methods: {
    login() {
      if (this.canLogin) {
        this.loading = true
        this.ajaxLogin(
          this.account.value,
          this.password.value,
          (res) => {
            this.loading = false
            this.success = true
            setTimeout(() => {
              let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              this.$route.router.go(redirect);
            }, 1000);
          },
          (res) => { // 登录失败
            this.loading = false
            if (res.errors) {
              if (res.errors.password) {
                this.failMsg = res.errors.password[0]
                this.password.passed = false
              } else {
                if (res.errors.username) this.failMsg = res.errors.username[0]
                if (res.errors.mobile) this.failMsg = res.errors.mobile[0]
                if (res.errors.email) this.failMsg = res.errors.email[0]
                this.account.passed = false
              }
            } else {
              this.failMsg = '连接超时，请稍后再试。'
            }
            // 显示失败
            this.fail = true
          }
        )
      }
    },
    register() {
      this.$route.router.go('/member/register');
    },
  },
  ready() {
    if (this.auth) {
      setTimeout(() => {
        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
        this.$route.router.go(redirect);
      }, 0);
    }
  },
}
</script>
