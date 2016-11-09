# Toast 插件

### 引入

```Javascript
  // main.js
  import Vue from 'vue'
  import toast from 'ui/plugins/toast'
  Vue.use(toast)
```

### 例子

- 组件中使用

```Javascript

this.$toast('提示信息')

// 更多选项
this.$toast({
  message: '操作成功',
  icon: 'success', // 默认无
  iconColor: 'green', // 默认白色
  duration: 5000, // 持续时长
})

```

- 模板中使用

```html
<button @click="$toast({message: '我是插件', icon: 'tianjiagouwuche'})">ToastPlugin</button>
```

- action 中使用

```Javascript

Vue.$toast('提示信息')

```
