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
