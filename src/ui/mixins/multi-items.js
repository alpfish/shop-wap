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
  watch: {
    index (val, oldVal) {
      oldVal > -1 && this.$children[oldVal] && (this.$children[oldVal].currentSelected = false)
      val > -1 && (this.$children[val].currentSelected = true)
    }
  },
  data () {
    return {
      index: -1,
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
      index: -1,
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
      }
    }
  },

}

export {
  parentMixin,
  childMixin
}
