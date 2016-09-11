<template>
<div class="page">
  <header-bar>
    <button slot="left" text="返回"  @click="back"></button>
    <button slot="right" text="注册"  @click="register"></button>
  </header-bar>
  <content>
    <textfield type='tel' focus icon="zhanghao" label="帐号" placeholder="手机号/会员名"
      :value.sync="account.value"
      :rules="account.rules"
      :errors="account.errors"
      :perror.sync="account.perror"
      :passed.sync="account.passed"></textfield>
    <textfield type='password' icon="mima" label="密码" placeholder="请输入密码"
      :value.sync="password.value"
      :rules="password.rules"
      :errors="password.errors"
      :perror.sync="password.perror"
      :passed.sync="password.passed"></textfield>
    <button-area>
      <button-row>
        <button fill big raised :color="buttonColor" text="登录"
          @click="login">
          <span v-if="loading">登录中 ...</span>
        </button>
      </button-row>
    </button-area>
    <toast center icon="success" text="已经登录" v-if="auth"></toast>
    <toast center icon="success" text="登录成功" v-if="success"></toast>
    <toast center icon="fail" text="登录失败" v-if="fail"></toast>
    <toast center text="请修改后登录" v-if="canNotClick"></toast>
    <p>&nbsp;</p>
  </content>
</div>

</template>

<script>
import HeaderBar from 'components/ui/bars/headerBar'
import Content from 'components/ui/content'
import Textfield from 'components/ui/forms/textfield'
import Button from 'components/ui/button/button'
import ButtonRow from 'components/ui/button/button-row'
import ButtonArea from 'components/ui/button/button-area'
import Toast from 'components/ui/toast'
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
    back () {
      window.history.back()
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
    HeaderBar,
    Content,
    Textfield,
    Button,
    ButtonRow,
    ButtonArea,
    Toast,
  },

}
</script>
