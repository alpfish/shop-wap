<template>
    <page-footer>
      <footer-item class="active">
        <i class="icon icon-home"></i>
        <label>首页</label>
      </footer-item>

      <footer-item>
        <a v-link="{name: 'category'}">
          <span class="icon icon-cate"></span>
          <label>分类</label>
        </a>
      </footer-item>

      <footer-item>
        <a v-link="{name: 'search'}">
          <i class="icon icon-search"></i>
          <label>搜索</label>
        </a>
      </footer-item>

      <footer-item>
        <a v-link="{name: 'user-home'}">
          <i class="icon icon-mine"></i>
          <span class="badge">100+</span>
          <label>我的</label>
        </a>
      </footer-item>
    </page-footer>
</template>

<script>
import { Footer, Item } from 'vum/components/footer'

export default {
  components: {
    'page-footer': Footer,
    'footer-item': Item,
  }
}
</script>
