<template>
<div class="box">
  <p>&nbsp;</p>
  <textfield :field="mobile" @validate="validateMobile"></textfield>
  <textfield :field="password" @validate="validatePassword"></textfield>
  <textfield :field="passwordConfirmation" @validate="validatePasswordConfirmation"></textfield><p> &nbsp;</p>
  <m-button type="primary" size="large">注册</m-button>

</div>
</template>

<script>
import textfield from 'components/ui/textfield'
import MButton from 'components/ui/button'
import validate from 'libs/validate'

export default {
  data() {
      return {
        mobile: {
          type: 'tel',
          value: '',
          label: '手机',
          placeholder: '请输入手机号',
          state: '',
          message: '',
        },
        password: {
          type: 'password',
          value: '',
          label: '密码',
          placeholder: '请输入密码',
          state: '',
          message: '',
        },
        passwordConfirmation: {
          type: 'password',
          value: '',
          label: '确认密码',
          placeholder: '再次输入密码',
          state: '',
          message: '',
        },
      }
    },
    methods: {
      validateMobile(value) {
        let state = 'error'
        let message = ''
        if (!validate.required(value)) {
          message = '需要填写手机号。'
        } else if (!validate.mobile(value)) {
          message = '需要填写一个有效的11位数的手机号。'
        } else {
          state = 'success'
        }
        this.mobile.state = state
        this.mobile.message = message
        return state === 'success' ? true : false
      },
      validatePassword(value) {
        let state = 'error'
        let message = ''
        if (!validate.required(value)) {
          message = '需要填写密码。'
        } else if (!validate.minlength(value, 6)) {
          message = '密码需要最小6个长度的字符。'
        } else if (!validate.maxlength(value, 24)) {
          message = '密码长度需要小于24个字符。'
        } else {
          state = 'success'
        }
        this.password.state = state
        this.password.message = message
        return state === 'success' ? true : false
      },
      validatePasswordConfirmation(value) {
        let state = 'error'
        let message = ''
        if (!validate.required(value)) {
          message = '需要填写确认密码。'
        } else if (value !== this.password.value) {
          state = 'error'
          message = '两次输入的密码需要一致。'
        } else {
          state = 'success'
        }
        this.passwordConfirmation.state = state
        this.passwordConfirmation.message = message
        return state === 'success' ? true : false
      },
    },
    components: {
      textfield,
      MButton
    }
}
</script>

<style scoped lang="less">@import "../../assets/styles/my-mui-variables.less";

.box {
    background-color: @color-bg;
    height: 500px;
}
</style>
