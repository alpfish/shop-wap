# Tab 选项卡

## 用法

### 简洁的粟子

```html
<tab>
  <tab-item :selected="demo === item" v-for="item in list" @click="demo = item">{{item}}</tab-item>
</tab>
```
```Javascript
export default {
  data () {
    return {
      demo2: '美食',
      list2: ['精选', '美食', '电影', '酒店', '外卖']
    }
  }
}
```

## Props

### tab

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| line-width | 边框宽度 | Number |  | 2 |
| active-color | 选中的文字和线条颜色 | String |  | brand |
| default-color | 默认文字颜色 | String |  | gray |
| disabled-color | 禁用颜色 | String |  | #ddd |
| animate | 是否使用动画 | Boolean |  | true |

### tab

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| selected | 是否选中 | Boolean |  | false |
| disabled | 是否禁用 | Boolean |  | false |
