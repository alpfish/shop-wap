<template>
<view-box>
  <box gap="15px">
    <item-form icon="wode" label="选择">
      <checkbox v-for="item in data" :results="checked" :value="item"></checkbox><br>
    </item-form>
    <button mini @click="add" color="semi">添加</button>
  </box>
</view-box>
</template>

<script>
import { Box, Checkbox, ViewBox, Button, } from 'ui/components'

export default {
  components: {
    Box,
    Checkbox,
    ViewBox,
    Button,
  },
  data () {
    return {
      data: ['红色','黄色','白色'],
      checked: [],
    }
  },
  methods: {
    add() {
      this.checked = ['黄色']
    }
  }

}
</script>
