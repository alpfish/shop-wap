# TouchRipple
Touch ripple component for Vue.js(1.x ~ 2.x)，组件component/指令directive两种方法可供使用，灵活简单，兼容Vue.js全版本。

> 指令使用见 ui/directives/touch-ripple/README.md

- 要注意的地方：

  * 使用directive模式时，组件会给所对应元素内部append子节点，如果是p、tr、img、Input...这些标签由于浏览器不支持再内嵌元素，故将会失效，所以刚才所述的单标签或者一些特殊的不允许内部插入元素的行内元素，在使用时需使用component方式

  * 使用component模式时，组件会在外层自动包裹div，div默认是block的，且本质上已经改变了外层dom结构，如果需要的话，可以通过给组件加class来用css改变其成为指定的盒子类型，如：

    ``` html
    <touch-ripple class="inline">
       <button>it's a button</button>
    </touch-ripple>
    ```

    ``` css
    .inline {
      display: inline-block;
    }
    ```

  * 推荐directive模式使用，在directive模式失效时，改用component模式




``` javascript

import { TouchRipple } from 'ui/components/index.js'

// use
export default {
  components: {
    TouchRipple
  }
}
```

``` html
<!-- use with components -->
<touch-ripple>
   <!-- your code... -->
   <h1>it's a h1 title</h1>
   <div>it's a div block</div>
   <!-- ... -->
</touch-ripple>
```
