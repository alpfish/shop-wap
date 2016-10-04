<!-- cart.list -->
<template>
<div>
  <x-header fixed back title="购物车">
    <button icon="bianji" text="编辑" slot="right" ></button>
  </x-header>
  <br><br>
</div>
</template>

<script>
import {
  Checkbox,
  XHeader,
  Button,
} from 'ui/components'

export default {
  components: {
    Checkbox,
    XHeader,
    Button,
  },
  data () {
    return {
      checkboxData: ['a', 'b', 'c'],
      checkbox1: []
    }
  }
}
</script>
