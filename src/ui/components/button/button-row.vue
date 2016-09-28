<!-- 一行放多个 Button，与 ButtonArea 和 Button 配合使用  -->
<template>
  <div class="buttons-row">
    <slot></slot>
  </div>
</template>

<style lang="less">
.buttons-row {
  align-self: center;
  display: flex;
  margin: 1em 0;
  padding-left: 15px;
  padding-right: 15px;
  .button {
    margin-left: 15px;
    width: 100%;
    flex: 1;
    font-weight: 600;
  }
  .button:first-child {
    margin-left: 0;
  }
}
</style>
