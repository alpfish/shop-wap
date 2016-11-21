# XNumber

数字输入组件， 使用 v-model 双向绑定

----

## 用法

```html
  <x-number v-model="nums" :min="1" :max="5"></x-number>
```

## Props
| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| min | 最小值，按step自动修正 | Number |  |  |
| max | 最大值，按step自动修正 | Number |  |  |
| step | 步长，根据step自动修正min与value的值 | Number |  | 1 |
| readonly | 只读 | Boolean |  | false |
