<template>
  <div class="box-item" :style="style">
    <slot></slot>
  </div>
</template>

<script>
const prefixList = ['-moz-box-', '-webkit-box-', '']

export default {
  props: {
    // 宽度 如: 20px|0.1|2(2/12)
    width: [Number, String],
    // 排序
    order: [Number, String],
  },
  methods: {
    buildWidth (width) {
      if (typeof width === 'number') {
        if (width < 1) {
          return width
        } else {
          return width / 12
        }
      } else if (typeof width === 'string') {
        return width.replace('px', '') / this.bodyWidth
      }
    }
  },
  computed: {
    style () {
      let styles = {}
      // 条目间距
      let marginName = this.$parent.vertical ? 'marginTop' : 'marginLeft'
      styles[marginName] = typeof this.$parent.gutter === 'string' ? this.$parent.gutter : `${this.$parent.gutter}px`
      // styles[marginName] =  : `${this.$parent.gutter}px`

      // 条目宽度
      if (this.width) {
        for (let i = 0; i < prefixList.length; i++) {
          styles[prefixList[i] + 'flex'] = `0 0 ${this.buildWidth(this.width) * 100}%`
        }
      }

      // 条目顺序
      if (typeof this.order !== 'undefined') {
        styles.order = this.order
      }

      return styles
    }
  },
  data () {
    return {
      bodyWidth: document.documentElement.offsetWidth
    }
  }
}
</script>
