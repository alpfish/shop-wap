<!-- 设置各边距，与 ButtonRow 和 Button 配合使用  -->
<template>
  <div class="button-area">
    <slot></slot>
  </div>
</template>

<style lang="less">
.button-area {
  margin-top: 16*2px;
  margin-bottom: 32*2px;
  padding: 0 16*2px;
  > .button + .button{
    margin-top: 16*2px;
  }
  width: 100%;
}
</style>
