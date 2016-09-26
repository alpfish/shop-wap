<!-- Home -->
<template>
<div>
  <x-header fixed back title="购物车">
    <!-- <span slot="left">返回</span> -->
    <!-- <span slot="right">更多</span> -->
    <!-- <button slot="left" >返回</button> -->
    <!-- <icon name="bianji" :size="14" slot="right">编辑</icon> -->
    <button icon="bianji" text="编辑" slot="right" ></button>
    <!-- <icon slot="right" name="gouwuche" :size="18"></icon> -->
  </x-header>
  <p v-for="i in 5">.oOo.</p>
  <p v-for="i in 100">.oOo.</p>
  <float-button fixed style="left: 15px; bottom: 60px;"></float-button>
</div>
</template>

<script>
// import Nav from 'components/nav'
import {
  XHeader,
  Button,
  FloatButton,
  Icon
} from 'ui/components'

export default {
  components: {
    XHeader,
    Button,
    FloatButton,
    Icon,
  },
}
</script>
<style>

</style>
