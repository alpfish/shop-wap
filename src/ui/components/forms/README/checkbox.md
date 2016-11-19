# Checkbox

复选框

> 借鉴 vux 和 vue-carbon ， 更加精简，只封装基本功能。

----

## 用法

```html
<cells>
  <cell><checkbox v-model="colors" option="红色" label="红色"></checkbox></cell>
  <cell><checkbox v-model="colors" option="黑色" label="黑色" disabled></checkbox></cell>
  <p slot="tips">{{ colors }}</p>
</cells>
<cells>
  <cell v-for="option in options">
    <checkbox v-model="checked" :option="option" :label="option"></checkbox>
  </cell>
  <p slot="tips">{{ checked }}</p>
</cells>
```

```javascript
{
  data () {
    return {
      colors: [],
      options: ['选项1', '选项2', '选项3'],
      checked: ['选项1', '选项3'], // 这里系统自动双向绑定，即这里的值自动为已选择项
    }
  }
}
```

## API

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| v-model | 必须，存放选取结果的数组/布尔变量，由各个 option 组成，可在外部指定已选项 | Array Boolean |  |  |
| option | 必须，单个选项值，其他选项值在外部使用相同的v-model变量循环组装 | String, Number, Boolean |  |  |
| label | label | String |  |  |
| disabled | 禁用 | Boolean | | false |
