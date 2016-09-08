<template>
<div class="container">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<style scoped lang='less'>
@import "../../style/var.less";

.container {
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: @color-bg;
}

.content {
  position: relative;
  width: 95%;
  margin: 0 auto;
  background-color: transparent;
}

</style>
