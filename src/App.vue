<template>
  <div>
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from 'components/tabbar'
import {
  mapMutations
} from 'vuex'

export default {
  name: 'app',
  components: {
    Tabbar,
  },

  methods: {
    ...mapMutations([
      'SET_INPUTING',
      'SET_LANDSCAPE'
    ]),
  },

  created() {
    // 设置 em rem 字号
    const setFontSize = () => {
      let ua = navigator.userAgent.toLowerCase()
      let isPC = ! /mobi/i.test(ua)
      // 页面宽(可变)用 document.body.clientWidth
      // 设备宽(固定)用 window.screen.width * 2
      let width = window.screen.width
      let height = window.screen.height
      // 横竖屏
      width = width < height ? width : height
      // 限制 rem 参照字号 24px - 51.2px，设计时参照iPhone6 37.5px
      width = isPC ? 320 : width < 240 ? 240 : width > 512 ? 512 : width
      // 使用 document.body.clientWidth 获取宽高时，须设置 body height: 100% 或 width: 100% 才能使html font-size 设置有效
      // 但如果设置了 body height 值，将影响滚动行为，所以最好使用 window.screen.width 获取宽高
      let html = document.documentElement
      html.style.setProperty('font-size', `${width*0.1}px`)
      // 因为html过大，设置 em 顶级参照 body, weui 很多地方使用 em
      document.body.style.setProperty('font-size', '16px')
    }
    setFontSize()

    const width = document.body.clientWidth
    const height = document.body.clientHeight
    // 初始设置横竖屏
    let isLandscape = width > height ? true : false
    this.SET_LANDSCAPE(isLandscape)

    // 监视窗口调整, 不能在应用中的其他地方设置 window.onresize， 否则之前设置的失效
    window.onresize = () => {
      setFontSize()
      let nWidth = document.body.clientWidth
      let nHeight = document.body.clientHeight
      let inputing = nHeight < height && nWidth === width ? true : false
      let isLandscape = nWidth > width ? true : false

      this.SET_INPUTING(inputing)
      this.SET_LANDSCAPE(isLandscape)
    }
  }

}
</script>

<style lang="less">
@import './ui/styles/_fn.less';

body,html{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

</style>
