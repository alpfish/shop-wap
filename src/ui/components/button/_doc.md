# Button

按钮，可以自定义各种样式，默认无边框，添加prop: color 即有边框

> 借鉴于 [Vue-Carbon](https://myronliu347.github.io/vue-carbon/#!/button)

----

## 用法

```html
<button-row>
<button fill raised icon="gouwuche" color="primary">加入购物车</button>
</button-row>
<button-row>
<button fill raised color="warning">warning</button>
</button-row>
<button-row>
<button color='default'>default</button>
</button-row>
<button-row>
<button fill raised color='blue'>blue</button>
</button-row>
<button-row>
<button mini color="purple" text="迷你"></button>
<button mini color="purple" disabled text="禁用"></button>
<button mini color="blue" text="文字"></button>
<button mini color="blue" disabled text="禁用"></button>
</button-row>
```

## API

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| text | 按钮上的文字 | String |  |       |
| icon | 按钮上的icon | String |  | null |
| color | 按钮颜色    | String | red,green,amber,blue... | 无色 |
| fill | 设置为颜色填充按钮 | Boolean |  | false |
| raised | 设置为底部有阴影的按钮 | Boolean |  | false |
| mini |  迷你按钮 | Boolean | | false |


## Slot

| name | 描述     |
| :------------- | :------------- |
| 默认  | button的内容，设置了之后 text, icon 参数将会无效  |
