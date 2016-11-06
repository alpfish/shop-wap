<template>
<view-box style="background-color: #fff;">
  <x-header back title="会员注册">
  </x-header>

  <textfield type='tel' placeholder="输入手机号码"
    :value.sync="mobile.value"
    :rules="mobile.rules"
    :errors="mobile.errors"
    :passed.sync="mobile.passed"></textfield>
  <textfield type='password' placeholder="输入密码"
    :value.sync="password.value"
    :rules="password.rules"
    :errors="password.errors"
    :passed.sync="password.passed"></textfield>
  <textfield type='password' placeholder="再次输入密码"
    :value.sync="repassword.value"
    :rules="repassword.rules"
    :errors="repassword.errors"
    :passed.sync="repassword.passed"></textfield>
  <div style="margin: 30px;">
    <x-button fill raised
      color="red"
      @click="register"
      :disabled="loading || !canReg"
      :text="loading ? '注册中 ...' : '注册'"></x-button></div>

  <toast :show.sync="success" type="success" text="注册成功"></toast>
  <toast :show.sync="fail" type="text" :text="failMsg"></toast>
</view-box>
</template>

<script>
import { ViewBox, XHeader, XButton, Textfield, Toast} from 'ui/components'
import {register} from 'actions/member'

export default {
  data() {
    return {
      mobile: {
        value: '',
        rules: 'required|mobile',
        errors: '手机号码不能为空。|格式不正确。',
        passed: false,
      },
      password: {
        value: '',
        rules: 'required|min_length(6)|max_length(20)',
        errors: '请输入密码。|密码最小6位。|密码最多20位。',
        passed: false,
      },
      repassword: {
        value: '',
        rules: 'required|min_length(6)|max_length(20)', // 见 watch
        errors: '请再次输入密码。|密码最小6位。|密码最多20位。',
        passed: false,
      },
      loading: false,
      success: false,
      fail: false,
      failMsg: '',
    }
  },
  vuex: {
    actions: {
      ajaxReg: register
    }
  },
  computed: {
    canReg() {
      return this.mobile.passed
          && this.password.passed
          && this.repassword.passed
          && !this.loading
          ? true : false
    },
  },
  methods: {
    register() {
      if (this.password.value !== this.repassword.value) {
        this.failMsg = "前后密码不一致。"
        this.fail = true
        this.repassword.passed = false
      }
      else if (this.canReg) {
        this.loading = true
        this.ajaxReg(
          {
            mobile: this.mobile.value,
            vcode: 1234, // TODO
            password: this.password.value,
            password_confirmation: this.repassword.value,
          },
          (res) => {
            this.loading = false
            this.success = true
            setTimeout(() => {
              this.back()
            }, 2000);
          },
          (res) => {
            this.loading = false

            setTimeout(() => this.fail = false, 2000)
            if (res.errors) {
              if (res.errors.mobile) {
                this.failMsg = res.errors.mobile[0]
                this.mobile.passed = false
              }
              if (res.errors.password) {
                this.failMsg = res.errors.password[0]
                this.password.passed = false
              }
              if (res.errors.password_confirmation) {
                this.failMsg = res.errors.password_confirmation[0]
                this.repassword.passed = false
              }
            } else {
              this.failMsg = '连接超时，请稍后再试。'
            }
            this.fail = true
          }
        )
      }
    },
    login() {
      this.$route.router.go('/member/login');
    },
  },
  components: {
    ViewBox,
    XHeader,
    Textfield,
    XButton,
    Toast,
  }
}
</script>
