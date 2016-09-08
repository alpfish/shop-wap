<template>
<div class="box">
  <text type='tel' icon="zhanghao" label="帐号" placeholder="手机号/会员名"
    :value.sync="mobile.value" :rules="mobile.rules" :errors="mobile.errors"
    :passed.sync="mobile.passed"></text>
  <text type='password' icon="mima" label="密码" placeholder="请输入密码" :value.sync="password.value" :rules="password.rules" :errors="password.errors" :passed.sync="password.passed"></text>
  <button-area>
    <button-row>
      <button fill big raised color="red" text="登录"></button>
    </button-row>
  </button-area>

</div>
</template>

<script>
import Text from 'components/ui/forms/textfield'
import Button from 'components/ui/button/button'
import ButtonRow from 'components/ui/button/button-row'
import ButtonArea from 'components/ui/button/button-area'

export default {
  data() {
      return {
        mobile: {
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
      }
    },
    methods: {

    },
    components: {
      Button,
      ButtonRow,
      ButtonArea,
      Text,
    }
}
</script>

<style scoped lang="less">@import "../../assets/styles/my-mui-variables.less";

.box {
    background-color: @color-bg;
    height: 500px;
}
</style>
