# Textfield

>
1. 使用 weui
2. 不支持验证
3. 外部控制状态显示

----

## 用法

```html
<cells>
  <textfield v-model="value" label="手机号" placeholder="请输入手机号" type="tel"></textfield>
  <textfield v-model="value" label="密码" placeholder="请输入密码" type="password"></textfield>
  <p slot="tips">所有type都支持 v-model 双向绑定数据。</p>
</cells>

<cells>
  <textfield label="日期" type="date"></textfield>
  <textfield label="时间" type="time"></textfield>
  <textfield label="日期时间" type="datetime-local"></textfield>
</cells>

<cells title="右侧按钮(验证码或图片)">
  <textfield label="手机号" type="tel" class="weui-cell_vcode">
    <a slot="right" href="javascript:;" class="weui-vcode-btn">获取验证码</a>
  </textfield>
</cells>

<cells title="文本框">
  <textfield v-model="value" :max-length="10" placeholder="请输入内容" type="textarea" :rows="3"></textfield>
  <p slot="tips">BUG: 文本框(和日期)在复杂表单中，(QQ浏览器)输入时手机虚拟键盘弹出导致页面所有cells底线消失，在UC中直接不显示底线。这可能是cells/cell组件的问题</p>
</cells>
```

## Props
| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| type | 输入框类型 | String | input 所有类型，外加文本域 textarea | text |
| rows | 行数，类型为 textarea 时有效 | Number |  | 无 |
| label | 标签 | String |  | 无 |
| value | 双向绑定值 | String |  | 无 |
| state | 状态 | String | warn success ... |  |
| readonly | 只读 | Boolean |  | false |
| disabled | 禁用 | Boolean |  | false |
| placeholder | 占位字符 | String |  | 无 |
| autocomplete |  | String |  | off |
| autocapitalize |  | String |  | off |
| autocorrect |  | String |  | off |
| spellcheck |  | Boolean |  | false |
| max-length | 最长字数，适用于textarea | Number |  |  |

## Slot
| 名称 | 说明 |
| :---- | :---- |
| right | 右侧按扭、验证码等 |
