<template>
  <div class="page">
    <content>
      <div class="content-padded">
        <div class="row">
          <div class="col-20">
            <div class="page">
              <content>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
                <h1>Left</h1>
              </content>
            </div>
          </div>
          <div class="col-60">
          </div>
          <div class="col-20">

          </div>
        </div>
      </div>
    </content>
    <home-footer></home-footer>
  </div>
</template>

<script>
import Footer from 'components/home/Footer'
import Content from 'vum/components/content'
export default {
  components: {
    homeFooter: Footer,
    Content
  }
}
</script>

<style lang="less" scoped>
.row {
  margin-top: 10px;
  text-align: center;
}

[class*="col-"] {
  border: 1px solid #ddd;
}
</style>
