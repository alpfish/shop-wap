<template>
<div class="img-responsive" :style="{'background-image':'url('+placeholder+')'}">
  <img :src="src" @load="loaded" style="width: 100%; transition: all 1.2s ease;" :style="{'opacity':ready?1:0}">
</div>
</template>


<script>
	export default{
		data(){
      return {
        ready:false
      }
		},

		methods:{
      loaded(){
        const self=this;
        setTimeout(function(){
          self.ready=true
        },100)
      }
		},
		props:{
      src:{
				type:String,
				required:true
			},
      placeholder:{
        type:String
      }
		}
	}
</script>

<style>
.img-responsive {
  position: relative;
  overflow: hidden;
  background: #fff no-repeat center center;
  background-size: 100%
}
</style>
