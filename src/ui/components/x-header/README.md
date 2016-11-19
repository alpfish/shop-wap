# XHeader

页头

----

## 用法

```html
<x-header fixed back more close>购物车</x-header>
```

## Props
| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| title | 标题 | String |  | 无 |
| fixed | 固定 | Boolean |  | false |
| back | 返回按钮 | Boolean |  | fasle |
| close | 关闭按钮 | Boolean |  | false |
| more | 右侧更多 | Boolean |  | false |
| color | 头部颜色 | String |  |  |
| bgColor | 背景色 | String |  |  |
| bgAlpha | 背景透明度 | Number |  | 1 |

## Slots

| 名称 | 说明 |
| :---- | :---- |
| left | 位于Back之后的内容 |
| -- | 中间 |
| right | 标题之后的内容 |
