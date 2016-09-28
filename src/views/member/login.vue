<template>
<div>
  <x-header back title="会员登录">
    <button slot="right" text="注册" @click="register"></button>
  </x-header>
  <textfield type='text' icon="zhanghao" label="手机号/会员名" label-float
    :value.sync="account.value"
    :rules="account.rules"
    :errors="account.errors"
    :perror.sync="account.perror"
    :passed.sync="account.passed"></textfield>
  <textfield type='password' icon="mima" label="密码" label-float
    :value.sync="password.value"
    :rules="password.rules"
    :errors="password.errors"
    :perror.sync="password.perror"
    :passed.sync="password.passed"></textfield>
  <button-row>
    <button fill raised
      @click="login"
      :color="buttonColor"
      :disabled="(loading)"
      :text="loading ? '登录中 ...' : '登录'"></button>
  </button-row>
  <button-row>
  <button mini @click="register">注册会员</button>
  <button mini>忘记密码</button>
  </button-row>

  <toast center icon="success" text="登录成功" v-if="success"></toast>
  <toast center icon="fail" text="登录失败" v-if="fail"></toast>
  <toast center text="请正确填写表单" v-if="canNotClick"></toast>
  <p>&nbsp;</p>
</div>

</template>

<script>
import {XHeader, Button, ButtonRow, ButtonArea, Textfield, Toast} from 'ui/components'
import {login} from 'actions/member'

export default {
  data() {
    return {
      account: {
        value: '',
        rules: 'required',
        errors: '请输入帐号',
        perror: '',
        passed: false,
      },
      password: {
        value: '',
        rules: 'required|min_length(6)|max_length(20)',
        errors: '请输入密码。|密码长度最少6位。|密码长度不能超过20位。',
        perror: '',
        passed: false,
      },
      loading: false,
      success: false,
      fail: false,
      canNotClick: false,
    }
  },
  computed: {
    canLogin() {
      return this.account.passed && this.password.passed && !this.loading ? true : false
    },
    buttonColor() {
      return this.canLogin || this.loading ? 'blue' : 'red'
    }
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
              this.success = false
              let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              this.$route.router.go(redirect);
            }, 2000);
          },
          (res) => { // 登录失败
            this.loading = false
            this.fail = true
            setTimeout(() => this.fail = false, 2000)
            if (res.errors) {
              if (res.errors.username) this.account.perror = res.errors.username[0]
              if (res.errors.mobile) this.account.perror = res.errors.mobile[0]
              if (res.errors.email) this.account.perror = res.errors.email[0]
              if (res.errors.password) this.password.perror = res.errors.password[0]
            } else {
              this.account.perror = '连接超时，请稍后再试。'
            }
          }
        )
      } else {
        this.canNotClick = true
        setTimeout(() => this.canNotClick = false, 1500)
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
      }, 2000);
    }
  },
  components: {
    XHeader,
    Textfield,
    Button,
    ButtonRow,
    ButtonArea,
    Toast,
  },

}
</script>
