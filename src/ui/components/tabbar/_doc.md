# Tabbar

底部导航

tabbar 和 tabbar-item 配合使


代码借鉴于：[Vux](https://github.com/airyland/vux)

----

## 用法

```html
<div>
<tabbar>
  <tabbar-item active v-link="{name: 'home'}">
    <icon slot="icon" name="shouye" :size="18"></icon>
    <span slot="label">首页</span>
  </tabbar-item>
  <tabbar-item v-link="{name: 'category'}">
    <icon slot="icon" name="fenlei1" :size="18"></icon>
    <span slot="label">商品分类</span>
  </tabbar-item>
  <tabbar-item badge="2">
    <icon slot="icon" name="gouwuche" :size="18"></icon>
    <span slot="label">购物车</span>
  </tabbar-item>
  <tabbar-item dot v-link="{name: 'member'}">
    <icon slot="icon" name="wode" :size="18"></icon>
    <span slot="label">我的</span>
  </tabbar-item>
</tabbar>
</div>
```


## Props

### tabbar-item

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| active | 是否激活 | Boolean |  |  false |
| badge  | 徽标(提醒数字) | String |  |  |
| dot  | 提醒原点 | Boolean |  | false |

## Slots

| 名称 | 说明 |
| :---- | :---- |
| icon | 图标 |
| label  | 文字 |
