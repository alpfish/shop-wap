# XNumber

数字输入组件

----

## 用法

```html
<x-number :value.sync="num" :min="0" :max="100" :step="10" :fillable="false"></x-number>
```

## Props
| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| value | <必须>，双向绑定值 | Number |  | 0 |
| step | 步长，根据step自动修正min与value的值 | Number |  | 1 |
| min | 最小值，按step自动修正 | Number |  |  |
| max | 最大值，按step自动修正 | Number |  |  |
| fillable | 可以手动输入数字 | Boolean |  | false |
| width | 输入框宽度 | Number,String |  | 45px |
