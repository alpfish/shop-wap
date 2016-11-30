# List

列表，常用的基础模板。可容纳如表单控件、图标、图片、文字等各种元素，形成表单分组、图文混排，简单列表等多种排版样式。

> 与 ListItem 搭配使用,  使用 ListLabel 包裹 ListItem 后, ListItem 中的 Slots 不起作用

----

## 用法

```html
<!-- 简单用法 - 基本单行列表-->
<list title="我的帐户">
  ...
</list>

<!-- 复杂用法 - 可组成任何样式的图文混排-->
<list title="我的帐户"
:line="false"
:item-line="false"
item-line-space="0px"
item-height="52px"
item-padding="0 15px"
gutter="3px"
bgcolor="#ddd">
  <list-item title="帐户" icon="wode" icon-color="red" arrow></list-item>
  <list-item title="左侧" img="http://cn.vuejs.org/images/logo.png"><span slot="right">右侧</span></list-item>
  <list-item title="购物车" icon="gouwuche" icon-color="brand" v-link="{path: 'cart/list'}" arrow></list-item>
  <list-label><list-item title="开具发票" icon="chongzhi" > <switch slot="right" :value="sex"></switch></list-item><list-label>
  <list-item title="标题">
      <checkbox slot="left" :result="checked" value="选项3"></checkbox>
  </list-item>
  <list-label><list-item title="标题">
      <checkbox slot="left" :result="checked" value="选项2">dd</checkbox>
  </list-item></list-label>
</list>

```

## Props

### List
| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| title | 列表标题 | String |  |  |
| title-color | 标题颜色 | String |  |  |
| bgcolor | 背景色 | String |  | '#fff' |
| line | 显示列表首尾分隔线 | Boolean |  | true |
| gutter | 设置子元素间的上下间距，如: 10 或 10px | Number, String |  | 0 |
| item-height | 统一设置子元素高度, (默认44px) | Number, String |  | '44px' |
| item-padding | 统一设置子元素 padding, (默认0 15px) | String |  | '0 15px' |
| item-line | 显示子元素分隔线 | Boolean |  | true |
| item-line-space | 统一设置子元素分隔线左右空白，按标准 padding/magin 方式设置 | String |  | '0 0 0 15px' |

### ListItem
| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| title | 标题 | String |  |  |
| subtitle | 子标题颜色 | String |  |  |
| img | 图片图标，标准简单样式下的小图标 | String |  |  |
| icon | 字体图标名称 | String |  |  |
| icon-color | 字体图标颜色 | String |  |  |
| link | 链接 | String, Object |  |  |
| arrow | 显示箭头 | Boolean |  | false |
| bgcolor | 背景色 | String |  | '#fff' |

## Slots

### List
| name | 描述     |
| :------------- | :------------- |
| 默认  | 放置 ListItem 或 ListItemForm 的插槽  |

### ListItem
| name | 描述     |
| :------------- | :------------- |
| 默认  | 中间主体插槽，如各种标题，描述，等  |
| left  | 左边插槽，如图片、图标、复选按钮等  |
| right  | 右边插槽，如箭头，删除按钮等  |

### ListLabel
| name | 描述     |
| :------------- | :------------- |
| 默认  | 放置 ListItem 的插槽, 使用 ListLabel后, ListItem 中的 Slots 不起作用  |
