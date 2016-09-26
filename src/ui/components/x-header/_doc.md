# XHeader

页头

----

## 用法

```html
<x-header fixed back title="购物车">
  <button icon="bianji" text="编辑" slot="right"></button>
</x-header>
```

## Props
| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| title | 标题 | String |  | 无 |
| fixed | 固定 | Boolean |  | false |
| back | 返回按钮 | Boolean |  | fasle |
| backtext | 返回按钮&文字 | Boolean |  | false |

## Slots

| 名称 | 说明 |
| :---- | :---- |
| left | 位于Back之后的内容 |
| right | 标题之后的内容 |
