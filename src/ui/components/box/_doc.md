# Box

Flex布局, Box 与 BoxItem 配合使用。

> 借鉴于：[Vux](https://github.com/airyland/vux)

----

## 用法

```html
<box v-for="item in data" style="margin-bottom: 8px;" gutter="5px">
  <box-item width="20px">
      <checkbox :results="checked" :value="item" style="height:100px;"><p></p></checkbox>
  </box-item>
  <box-item style="height:120px; background-color: #333;">
    <div class="center middle">{{item}}</div>
  </box-item>
  <box-item width="50px" style="height:120px; background-color: #911;">
  </box-item>
</box>
```

## Props

## Box

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| gutter | 中缝/槽距/间隔 | Number, String | 数字或带px的字符 | 0 |
| vertical | 条目是否垂直排列  | Boolean |  | false(水平) |
| justify | 条目水平 X 轴方向对齐方式  | String | flex-start, flex-end, center, space-between, space-around | flex-start |
| align | 条目垂直 Y 轴方向对齐方式  | String | flex-star,  flex-end, cente,  baseline, stretch | flex-start |
| wrap | 溢出换行 | String | nowrap, wrap, wrap-reverse | nowrap |
| direction | 主轴方向  | String | row, row-reverse, column, column-reverse | row |

## BoxItem

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| width | 条目所占宽度，支持比例或像素方式, 即设置属性 flex  | Number, String | 如：20px|0.1|2 整数代表占12份中的几份 | 1 |
| order | 排序  | Number, String |  | 0 |
