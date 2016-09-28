<!-- Home -->
<template>
<div>
  <view-box>


    <!-- <float-button fixed style="left: 15px; bottom: 60px;" icon="gouwuche" color="red"></float-button> -->
    <div slot="bottom"><tabbar></tabbar></div>
  </view-box>
</div>
</template>

<script>
import Tabbar from 'components/tabbar'
import { FloatButton, ViewBox, Badge, Button, ButtonRow, Icon, IconButton } from 'ui/components'

export default {
  components: {
    FloatButton,
    Tabbar,
    ViewBox,
    Badge,
    Button,
    ButtonRow,
    Icon,
    IconButton,
  },

}
</script>
