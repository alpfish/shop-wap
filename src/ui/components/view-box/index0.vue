<!-- view-box -->
<template>
  <div class="page">
    <slot name="header"></slot>
    <content>
      <slot></slot>
    </content>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
import Content from './content'

export default {
  components: {
    Content,
  },
}
</script>
