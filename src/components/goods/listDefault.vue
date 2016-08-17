<template>
  <div class="page">
    <simple-header title="List" :back-link="true"></simple-header>
    <!-- <cell v-for="iterm in goods" :title="iterm.name" :value="iterm.price">
      <button @click="addToCart(iterm)"> + </button>
    </cell> -->
    <!-- <p><p>
    </p></p>
    <list></list> -->
      <content>
        <div class="list-block media-list">
          <ul>
            <li>
              <a class="item-content item-link">
                <div class="item-media"><img src="../../assets/vum/assets/images/icon-list.png" width="88"></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">Title</div>
                    <div class="item-after">After</div>
                  </div>
                  <div class="item-subtitle">Subtitle</div>
                  <div class="item-text">some description some description some description some description </div>
                </div>
              </a>
            </li>
            <li>
              <a class="item-content item-link">
                <div class="item-media"><img src="../../assets/vum/assets/images/icon-list.png" width="88"></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">Title</div>
                    <div class="item-after">After</div>
                  </div>
                  <div class="item-subtitle">Subtitle</div>
                  <div class="item-text">some description some description some description some description </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </content>
  </div>
</template>

<script>
import { addToCart } from 'actions/cartActions'
//import List from 'components/cart/list'

import {SimpleHeader, Link, Title } from 'vum/components/header'
import Content from 'vum/components/content'

export default{
  vuex: {
    getters: {
      goods: ({goodsList}) => goodsList.current
    },
    actions: {
      addToCart
    }
  },
  components: {
    //List,
    SimpleHeader,
    Content
  }
}
</script>
