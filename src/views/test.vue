<!-- Home -->
<template>
<div>
  {{ value | json }}
  <div  v-for="i in 50">
    <p :id="i" @click="getValue(i)">
      {{ i }}
    </p>
  </div>
</div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    getValue(i) {
        let element = document.getElementById(i)
        let val = {}
        val.view = this.getViewport()
        val.page = this.getPagearea()
        val.top = this.getElementTop(element)
        val.left = this.getElementLeft(element)
        val.elementTop = this.getElementViewTop(element)
        this.value = val

        document.getElementById(0).scrollIntoView()
    },
    getViewport() {
　　　　if (document.compatMode == "BackCompat"){
　　　　　　return {
　　　　　　　　width: document.body.clientWidth,
　　　　　　　　height: document.body.clientHeight
　　　　　　}
　　　　} else {
　　　　　　return {
　　　　　　　　width: document.documentElement.clientWidth,
　　　　　　　　height: document.documentElement.clientHeight
　　　　　　}
　　　　}
　　},
    getPagearea(){
　　　　if (document.compatMode == "BackCompat"){
　　　　　　return {
　　　　　　　　width: Math.max(document.body.scrollWidth,
　　　　　　　　　　　　　　　　document.body.clientWidth),
　　　　　　　　height: Math.max(document.body.scrollHeight,
　　　　　　　　　　　　　　　　document.body.clientHeight)
　　　　　　}
　　　　} else {
　　　　　　return {
　　　　　　　　width: Math.max(document.documentElement.scrollWidth,
　　　　　　　　　　　　　　　　document.documentElement.clientWidth),
　　　　　　　　height: Math.max(document.documentElement.scrollHeight,
　　　　　　　　　　　　　　　　document.documentElement.clientHeight)
　　　　　　}
　　　　}
　　},
    getElementLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualLeft;
　　},
　　getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
　　},
    getElementViewLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollLeft=document.body.scrollLeft;
　　　　} else {
　　　　　　var elementScrollLeft=document.documentElement.scrollLeft;
　　　　}
　　　　return actualLeft-elementScrollLeft;
　　},
　　getElementViewTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current. offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　 if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollTop=document.body.scrollTop;
　　　　} else {
　　　　　　var elementScrollTop=document.documentElement.scrollTop;
　　　　}
　　　　return actualTop-elementScrollTop;
　　},
  },
}
</script>
