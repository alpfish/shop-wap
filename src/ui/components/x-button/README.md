# Button

按钮，可以自定义各种样式，默认无边框，添加prop: color 即有边框

> 借鉴于 [Vue-Carbon](https://myronliu347.github.io/vue-carbon/#!/button)

----

## 用法

```html
<div style="margin: 15px">
  <x-button fill color="primary" icon="gouwuche">加入购物车</x-button>
  <x-button fill color="primary" icon="gouwuche" disabled>加入购物车</x-button>
  <x-button fill color="warning">warning</x-button>
  <x-button fill color="warning" disabled>warning</x-button>
  <x-button color='default'>default</x-button>
  <x-button color='default' disabled>default</x-button>
  <x-button fill color='blue'>blue</x-button>
  <x-button fill color='blue' disabled>blue</x-button>
  <x-button color='blue'>blue</x-button>
  <x-button color='blue' disabled>blue</x-button>
  <x-button mini color="purple" >迷你</x-button>
  <x-button mini color="purple" disabled>禁用</x-button>
  <x-button mini>文字</x-button>
</div>
```

## API

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| color | 按钮颜色    | String | red,green,amber,blue... | 无色 |
| fill | 设置为颜色填充按钮 | Boolean |  | false |
| text | 按钮上的文字 | String |  |       |
| icon | 按钮上的icon | String |  | null |
| mini |  迷你按钮 | Boolean | | false |


## Slot

| name | 描述     |
| :------------- | :------------- |
| 默认  | button的内容，设置了之后 text, icon 参数将会无效  |
