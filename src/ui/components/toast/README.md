# Toast
1. toast.js 修改于 mint-ui
2. 样式继承 weui（外部引入），作相应修改
3. 继承 Icon 组件

### 引入
> 引入后可在任何地方使用

```Javascript
  import { Toast } from 'ui/components';
```

### 例子

```Javascript

// 基本使用
Toast('提示信息');

// 更多选项
Toast({
  message: '操作成功',
  icon: 'success', // 默认无
  iconColor: 'green', // 默认白色
  duration: 5000, // 持续时长
});

```

### 手动控制及加载图标

```Javascript
// icon 为 'loading' 时显示加载动画图标
handleToast() {
  let toast = this.$toast({message:'处理中', icon:'loading', autoHide: false})
  setTimeout(() => {
    toast.icon = 'success'
    toast.message = "操作成功"
  }, 2000);
  setTimeout(() => {
    toast.show = false
  }, 3500);
}
```
