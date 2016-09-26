# Textfield

文本输入 ( MDL风格，添加了验证功能 )

> 借鉴于：[Vue-Carbon](https://github.com/myronliu347/vue-carbon/blob/master/src/forms/textField.vue)

----

## 用法

```html
<textfield
  type='tel' icon="zhanghao" label="手机" placeholder="输入手机号"
  :value.sync="mobile.value"
  :rules="mobile.rules"
  :errors="mobile.errors"
  :perror.sync="mobile.perror"
  :passed.sync="mobile.passed">
</textfield>
```

```javascript
<script>
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
    }
  }
}
</script>
```


## Props
| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| value.sync | 双向绑定值 | String |  | 无 |
| label | 标签 | String |  | 无 |
| label-float | 标签浮动 | Boolean |  | false |
| icon | 图标 | String |  | 无 |
| type | 输入框类型 | String | input 所有类型，外加文本域 textarea | text |
| placeholder | 点位字符 | String |  | 无 |
| rows | 行数，类型为 textarea 时有效 | Number |  | 无 |
| focus | 聚焦（激活状态） | Boolean |  | false |
| rules | 数据验证规则 | String |  | 无 |
| errors | 验证错误信息 | String |  | 无 |
| perror.sync | 父组件错误信息，用双向同步达到 value 一改变 perror 就清空 | String |  | 无 |
| passed.sync | 通过所有验证 | Boolean |  | false |

## 验证规则

> 使用 ' | ' 符号分隔多个规则以及对应的错误提示信息。

| 规则 | 说明 |
| :---- | :---- |
| required | 必填 |
| mobile | 手机 |
| ip | ip |
| tel | 座机 |
| url | url |
| min | 最小数字 |
| max | 最大数字 |
| min_length | 最小长度 |
| max_length | 最大长度 |
| integer | 整数 |
| confirm | 密码确认，配合 watch 实现，使用见下. |

```javascript
// 密码确认
// 需要对 password.value 添加一条 watch , 及时更新确认密码字段的规则

 watch: {
    "password.value": function(val) {
      this.repassword.rules = `required|min_length(6)|max_length(20)|confirm(${val})`
    },
 },

```
