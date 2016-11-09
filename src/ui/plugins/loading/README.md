# Loading 插件

## 方法

1. $loading.show()
2. $loading.hide()

## 引入

```Javascript
  // main.js
  import Vue from 'vue'
  import loadin from 'ui/plugins/loading'
  Vue.use(loading)
```

## 例子

- 组件中使用

```Javascript
this.$loading.show('加载中')
this.$loading.hide()

// 更多选项
this.$loading.show({text: '加载中', place: 'page', color: 'red', size: '24px'})
```

- 模板中使用

```html
<button @click="$loading.show('加载中')">Loading Show</button>
<button @click="$loading.hide()">Loading Hide</button>
```

- action 中使用

```Javascript

Vue.$loading.show()
Vue.$loading.hide()

```
