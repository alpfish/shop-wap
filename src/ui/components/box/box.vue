<template>
  <div class="box" :class="{'col': vertical, 'row': !vertical}" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    // 中缝|槽距|间隔， 默认 0 (像素)
    gutter: {
      type: [Number, String],
      default: 0
    },

    // 条目是否垂直排列（默认水平）与 flex-direction: column; 功能相同
    vertical: {
      type: Boolean,
      default: false
    },

    // X 轴对齐方式 flex-start | flex-end | center | space-between | space-around
    justify: String,

    // Y 轴对齐方式 flex-start | flex-end | center | baseline | stretch
    align: String,

    // 溢出换行 nowrap | wrap | wrap-reverse;
    wrap: String,

    // 主轴方向 row | row-reverse | column | column-reverse;
    direction: String,
  },
  computed: {
    styles () {
      return {
        'justify-content': this.justify,
        'align-items': this.align,
        'flex-wrap': this.wrap,
        'flex-direction': this.direction
      }
    }
  }
}
</script>

<style lang="less">
.box{
  width: 100%;
  text-align: left;
  display: flex;
  box-align: center;
  align-items: center;
}
.box .box-item {
  flex: 1;
  min-width: 20*2/75rem;
  width: 0%;
}
.box-item > .box {
  width: 100%;
}
.box .box-item:first-child{
  margin-left: 0!important;
  margin-top: 0!important;
}
.col {
  box-orient: vertical;
  flex-direction: column;
}
.col > .box-item {
  width: 100%;
}
.row {
  box-direction: row;
  box-orient: horizontal;
  flex-direction: row;
}
</style>
