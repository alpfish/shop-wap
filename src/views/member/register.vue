<template>
<div class="box">
  <textfield type='tel' icon="zhanghao" label="手机" placeholder="请输入手机号码"
    :value.sync="mobile.value"
    :rules="mobile.rules"
    :errors="mobile.errors"
    :passed.sync="mobile.passed"></textfield>
  <textfield type='password' icon="mima" label="密码" placeholder="请输入密码"
    :value.sync="password.value"
    :rules="password.rules"
    :errors="password.errors"
    :passed.sync="password.passed"></textfield>
  <textfield type='password' icon="mima" label="确认密码" placeholder="请再次输入密码"
    :value.sync="repassword.value"
    :rules="repassword.rules"
    :errors="repassword.errors"
    :perror="repassword.perror"
    :passed.sync="repassword.passed"></textfield>
  <button-area>
    <button-row>
      <button big fill raised :color="buttonColor" text="注册" @click="vpassword"></button>
    </button-row>
  </button-area>
</div>
</template>

<script>
import Button from 'components/ui/button/button'
import ButtonRow from 'components/ui/button/button-row'
import ButtonArea from 'components/ui/button/button-area'
import Textfield from 'components/ui/forms/textfield'

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
        rules: 'required|min_length(6)|max_length(20)',
        errors: '请输入确认密码。|密码最小需要6位。|密码最大不能超过20位',
        perror: '',
        passed: false,
      },
    }
  },
  computed: {
    allPassed () {
      return this.mobile.passed
          && this.password.passed
          && this.repassword.passed
          && this.password.value === this.repassword.value
    },
    buttonColor () {
      return this.allPassed ? 'blue' : 'red'
    },
  },
  methods: {
    vpassword () {
      if (this.password.value != this.repassword.value) {
        this.repassword.perror = '两次输入的密码需要一致。'
      } else {
        this.repassword.perror = ''
      }
    }
  },
  components: {
    Textfield,
    Button,
    ButtonRow,
    ButtonArea,
  }
}
</script>

<style scoped lang="less">@import "../../assets/styles/my-mui-variables.less";

.box {
    background-color: @color-bg;
    height: 500px;
}
</style>
