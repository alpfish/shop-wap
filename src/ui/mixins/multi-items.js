const parentMixin = {
  mounted () {
    this.updateIndex()
  },
  methods: {
    updateIndex () {
      if (!this.$children) return
      this.number = this.$children.length
      let children = this.$children
      for (let i = 0; i < children.length; i++) {
        children[i].index = i
        if (children[i].currentSelected) {
          this.index = i
        }
      }
    }
  },
  // props: {
  //   index: {
  //     type: Number,
  //     default: -1
  //   }
  // },
  watch: {
    index (val, oldVal) {
      oldVal > 0 && this.$children[oldVal] && (this.$children[oldVal].currentSelected = false)
      val > 0 && (this.$children[val].currentSelected = true)
    }
  },
  data () {
    return {
      index: 0,
      number: this.$children.length
    }
  }
}

const childMixin = {
  props: {
    selected: Boolean,
  },
  data () {
    return {
      index: 0,
      currentSelected: this.selected
    }
  },
  mounted () {
    this.$parent.updateIndex()
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.updateIndex()
    })
  },
  methods: {
    onItemClick () {
      if (typeof this.disabled === 'undefined' || this.disabled === false) {
        this.currentSelected = true
        this.$parent.index = this.index
        this.$emit('on-item-click')
      }
    }
  },
  watch: {
    selected (val) {
      this.currentSelected = val
      if (val) {
        // 进入
        this.$parent.index = this.index
      } else {
        // 退出, 不要修改 index ，否则定位不准
        // this.$parent.index = 0 // 原来代码
      }
    }
  },

}

export {
  parentMixin,
  childMixin
}
