<template>
<div>
  <header-bar>
    <button slot="left" text="返回"  @click="back"></button>
    <button slot="right" text="登录"  @click="login"></button>
  </header-bar>
  <textfield type='tel' icon="zhanghao" label="手机" placeholder="输入手机号"
    :value.sync="mobile.value"
    :rules="mobile.rules"
    :errors="mobile.errors"
    :perror.sync="mobile.perror"
    :passed.sync="mobile.passed"></textfield>
  <textfield type='password' icon="mima" label="密码" placeholder="输入密码"
    :value.sync="password.value"
    :rules="password.rules"
    :errors="password.errors"
    :perror.sync="password.perror"
    :passed.sync="password.passed"></textfield>
  <textfield type='password' icon="mima" label="确认密码" placeholder="再次输入密码"
    :value.sync="repassword.value"
    :rules="repassword.rules"
    :errors="repassword.errors"
    :perror.sync="repassword.perror"
    :passed.sync="repassword.passed"></textfield>
  <button-area>
    <button-row>
      <button big fill raised :color="buttonColor" text="注册" @click="register">
        <span v-if="loading">注册中 ...</span>
      </button>
    </button-row>
  </button-area>
  <toast center icon="success" text="注册成功" v-if="success"></toast>
  <toast center icon="fail" text="注册失败" v-if="fail"></toast>
  <toast center text="请修改后注册" v-if="canNotClick"></toast>
  <p>&nbsp;</p>
</div>
</template>

<script>
import HeaderBar from 'components/ui/bars/headerBar'
import Textfield from 'components/ui/forms/textfield'
import Button from 'components/ui/button/button'
import ButtonRow from 'components/ui/button/button-row'
import ButtonArea from 'components/ui/button/button-area'
import Toast from 'components/ui/toast'
import {register} from 'actions/member'

export default {
  data() {
    return {
      mobile: {
        value: '',
        rules: 'required|mobile',
        errors: '请输入手机号码。|手机号码格式不正确。',
        perror: '',
        passed: false,
      },
      password: {
        value: '',
        rules: 'required|min_length(6)|max_length(20)',
        errors: '请输入密码。|密码最小需要6位。|密码最大不能超过20位',
        perror: '',
        passed: false,
      },
      repassword: {
        value: '',
        rules: '', // 见 watch
        errors: '请输入确认密码。|密码最小需要6位。|密码最大不能超过20位|两次输入密码不一致',
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
    back () {
      window.history.back()
    },
  },
  watch: {
    "password.value": function(val) {
      this.repassword.rules = `required|min_length(6)|max_length(20)|confirm(${val})`
    },
  },
  components: {
    HeaderBar,
    Textfield,
    Button,
    ButtonRow,
    ButtonArea,
    Toast,
  }
}
</script>
