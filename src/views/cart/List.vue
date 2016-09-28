<!-- cart.list -->
<template>
<div>
  <x-header fixed back title="购物车">
    <button icon="bianji" text="编辑" slot="right" ></button>
  </x-header>
</div>
</template>

<script>
import {
  XHeader,
  Button,
} from 'ui/components'

export default {
  components: {
    XHeader,
    Button,
  },
}
</script>
