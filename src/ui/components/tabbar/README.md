# Tabbar

底部导航

tabbar 和 tabbar-item 配合使


代码借鉴于：[Vux](https://github.com/airyland/vux)

----

## 用法

```html
<tabbar v-if="show">
  <tabbar-item label="首页" :link="{path: '/'}" :active="isHome" :icon="isHome ? 'shouye2' : 'shouye'"></tabbar-item>
  <tabbar-item label="商品" :link="{path: '/category'}" :active="isCategory" :icon="isCategory ? 'fenlei2' : 'fenlei1'"></tabbar-item>
  <tabbar-item label="购物车" :link="{path: '/cart'}" :active="isCart" :icon="isCart ? 'cart-active' : 'cart'"></tabbar-item>
  <tabbar-item label="我的" :link="{path: '/member'}" :active="isMember" :icon="isMember ? 'wode2' : 'wode'"></tabbar-item>
</tabbar>
```


## Props

### tabbar-item

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| label | label | String |  |   |
| link | 链接 | String, Object |  |   |
| icon | 图标 | Boolean |  |  false |
| active | 是否激活 | Boolean |  |  false |
| badge  | 徽标(提醒数字) | String |  |  |
| dot  | 提醒原点 | Boolean |  | false |

## Slots

### tabbar-item
| 名称| 说明 |
| :---- | :---- |
| 默认 | label |
