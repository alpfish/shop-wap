<template>
<view-box style="background-color: #fff;">
  <x-header back title="会员注册">
  </x-header>

  <textfield type='tel' placeholder="输入手机号码"
    :value.sync="mobile.value"
    :rules="mobile.rules"
    :errors="mobile.errors"
    :perror.sync="mobile.perror"
    :passed.sync="mobile.passed"></textfield>
  <textfield type='password' placeholder="输入密码"
    :value.sync="password.value"
    :rules="password.rules"
    :errors="password.errors"
    :perror.sync="password.perror"
    :passed.sync="password.passed"></textfield>
  <textfield type='password' placeholder="再次输入密码"
    :value.sync="repassword.value"
    :rules="repassword.rules"
    :errors="repassword.errors"
    :perror.sync="repassword.perror"
    :passed.sync="repassword.passed"></textfield>
  <button-row>
    <button fill raised
      @click="register"
      :color="buttonColor"
      :disabled="(loading)"
      :text="loading ? '注册中 ...' : '注册'"></button>
  </button-row>
  <toast center icon="success" text="注册成功" v-if="success"></toast>
  <toast center icon="fail" text="注册失败" v-if="fail"></toast>
  <toast center text="请正确填写表单" v-if="canNotClick"></toast>
</view-box>
</template>

<script>
import { ViewBox, XHeader, Button, ButtonRow, ButtonArea, Textfield, Toast} from 'ui/components'
import {register} from 'actions/member'

export default {
  data() {
    return {
      mobile: {
        value: '',
        rules: 'required|mobile',
        errors: '手机号码不能为空。|手机号码格式不正确。',
        perror: '',
        passed: false,
      },
      password: {
        value: '',
        rules: 'required|min_length(6)|max_length(20)',
        errors: '请输入密码。|密码最小6位。|密码最多20位。',
        perror: '',
        passed: false,
      },
      repassword: {
        value: '',
        rules: '', // 见 watch
        errors: '请再次输入密码。|密码最小6位。|密码最多20位。|两次密码不一致。',
        perror: '',
        passed: false,
      },
      loading: false,
      success: false,
      fail: false,
      canNotClick: false,
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
    buttonColor() {
      return this.canReg || this.loading ? 'blue' : 'red'
    },
  },
  methods: {
    register() {
      if (this.canReg) {
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
              this.success = false
              this.back()
            }, 2000);
          },
          (res) => {
            this.loading = false
            this.fail = true
            setTimeout(() => this.fail = false, 2000)
            if (res.errors) {
              if (res.errors.mobile) this.mobile.perror = res.errors.mobile[0]
              if (res.errors.password) this.password.perror = res.errors.password[0]
              if (res.errors.password_confirmation) this.password_confirmation.perror = res.errors.password_confirmation[0]
            } else {
              this.mobile.perror = '连接超时，请稍后再试。'
            }
          }
        )
      } else {
        this.canNotClick = true
        setTimeout(() => this.canNotClick = false, 1500)
      }
    },
    login() {
      this.$route.router.go('/member/login');
    },
  },
  watch: {
    "password.value": function(val) {
      this.repassword.rules = `required|min_length(6)|max_length(20)|confirm(${val})`
    },
  },
  components: {
    ViewBox,
    XHeader,
    Textfield,
    Button,
    ButtonRow,
    ButtonArea,
    Toast,
  }
}
</script>
