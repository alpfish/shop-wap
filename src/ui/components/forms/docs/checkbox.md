# Checkbox

多选

> 借鉴 vux 和 vue-carbon ， 更加精简，只封装基本功能。

----

## 用法

```html
<checkbox
v-for="item in options"
:value="checked"
:option="item"></checkbox>
```

```javascript
{
  data () {
    return {
      options: ['选项1', '选项2', '选项3'],
      checked: ['选项1', '选项3'], // 这里系统自动双向绑定，即这里的值自动为已选择项
    }
  }
}
```

## API

| 参数 | 说明 |	类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| value | 必须，存放选取结果的数组变量，由各个 option 组成，自动双向绑定，可在外部指定已选项 | Array | [ value1, value2, ... ] | [] |
| option | 必须，单个选项值，其他选项值在外部循环组装（即绑定相同的value变量） | String, Number |  |  |
| disabled | 禁止改变 | Boolean | | false |

## Slot

默认显示 value， 可指定其他任何形式的内容。
