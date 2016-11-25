<template>
  <view-box>
    <x-header :close="close" @on-close="$emit('on-close')" :back="!close" :title="title"></x-header>
    <cells>
      <textfield v-model="name" placeholder="姓名"></textfield>
      <textfield v-model="mobile" placeholder="手机号码" type="tel"></textfield>
      <textfield @click.native="intoSelect" :value="selectedDistrict" placeholder="城市位置" readonly></textfield>
      <textfield v-model="address" placeholder="详细地址 , 如街道、小区、楼牌号等"></textfield>
    </cells>
    <div style="margin: 15px"><x-button @click.native="save" color="brand" fill>保存<x-button></div>
    <div style="margin: 15px; text-align: center;">
      <checkbox v-model="isdefault" option="设为默认地址" label="设为默认地址"></checkbox>
    </div>

    <!-- POPUP 选择区域 -->
    <popup class="district-select" v-model="selecting" position="bottom">
      <view-box style="background-color: #fff;">
        <tab slot="header" active-color="black" default-color="black">
          <tab-item class="select-tab-item" v-for="i in 4"
            :selected="currLevel == i"
            :disabled="!district[i]"
            @click.native="setCurrentLevel(i)">
            {{getTabItemName(i)}}</tab-item>
          <tab-item disabled><loading :show="loading" place="inline" color="brand" size="24px"></loading></tab-item>
        </tab>
        <ul id="district-scroll-box">
          <li id="scroll-into-view"></li>
          <li @click="onDistrictItemClick(item)" v-for="item in currLevelData" :id="item.id" :class="{'selected': district[item.level].name == item.name}">
          {{item.name}}</li>
        </ul>
        <div slot="bottom" style="padding: 5px; background-color: #fff;">
          <x-button @click.native="selecting = false" color="semi" fill>{{ selectedDistrict ? '确认选择' : '请选择'}}<x-button>
        </div>
      </view-box>
    </popup>
  </view-box>
</template>

<script>
import Vue from 'vue'
import Api from 'src/libs/api'
import Validator from 'src/libs/validator'

import {
  Cells,
  Checkbox,
  Loading,
  Popup,
  Tab,
  TabItem,
  Textfield,
  XHeader,
  XButton,
  ViewBox,
} from 'ui/components'

export default {
  components: {
    Cells,
    Checkbox,
    Loading,
    Popup,
    Tab,
    TabItem,
    Textfield,
    XHeader,
    XButton,
    ViewBox,
  },
  props: {
    title: {
      type: String,
      default: '添加地址'
    },
    // 显示关闭图标，默认返回
    close: Boolean,
    // 编辑的地址数据对象(即页面中显示的5个字段)
    data: {
      type: Object,
      default: function() {
        return {
          name: null,
          mobile: null,
          address: null,
          district_id: null,
          isdefault: true
        }
      }
    },
  },
  data() {
    return {
      name: this.data.name,
      mobile: this.data.mobile,
      address: this.data.address,
      district_id: this.data.district_id,
      isdefault: this.data.isdefault,
      levelAliases: [
        '地区',
        '省份',
        '城市',
        '区县',
        '位置'
      ],
      district: [],
      currLevel: 1,
      loading: false,
      selecting: false,
    }
  },
  computed: {
    // 当前等级地区数据
    currLevelData () {
      return _.isEmpty(this.district[this.currLevel]) ? [] : this.district[this.currLevel].levelData
    },
    // 已选地区数据
    selectedDistrict () {
      if (!_.isEmpty(this.district[1]) && !_.isEmpty(this.district[2]) && !_.isEmpty(this.district[3])) {
        if (this.district[1].name && this.district[2].name && this.district[3].name) {
          if (_.isEmpty(this.district[4])) { // 第四级地区为空时只选前三级
            return `${this.district[1].name} ${this.district[2].name} ${this.district[3].name}`
          } else if(this.district[4].name) { // 不为空则必须选
            return `${this.district[1].name} ${this.district[2].name} ${this.district[3].name} ${this.district[4].name}`
          }
        }
      }
      return ''
    },
  },

  methods: {
    save () {
      if (this.validName().error || this.validMobile().error || this.validAddress().error) return
      if (!this.selectedDistrict) {
        this.$toast('请选择城市位置')
        return
      }
      let newData = {
        name: this.name,
        mobile: this.mobile,
        address: this.address,
        district_id: this.district_id,
        isdefault: this.isdefault,
      }
      this.$emit('on-save', newData)
    },

    intoSelect () {
      this.selecting = true
      this.scrollIntoView()
    },

    getTabItemName (level) {
      return _.isEmpty(this.district[level]) ? this.levelAliases[level] : this.district[level].name ? this.district[level].name : this.levelAliases[level]
    },

    setCurrentLevel (level) {
      if (!_.isEmpty(this.district[level])) {
        // 更改当前地区等级
        this.currLevel = level
        // 滚动视图
        this.scrollIntoView()
      }
    },

    // 滚动到视图，因为 header 部分遮住了一部分滚动高度，所要要计算调整滚动位置
    scrollIntoView () {
      // 默认未选中
      let lev = this.currLevel
      let id = parseInt(this.district[lev].id)
      let index = 0
      // 选中, 获取 index (以便调整滚动位置)
      if (id) {
        let district = this.district[lev].levelData
        index = _.findIndex(district, { 'id': id })
        index = index > 0 && !!district[index - 1] ? index - 1 : 0
        id = district[index].id
      }
      // console.log('id', id, 'index', index);

      setTimeout(() => { // document 准备后才计算
        // 是否可以滚动
        let height = 0
        let data = this.district[lev].levelData
        for (let i = 0; i < data.length; i++) {
          let itemEl = document.getElementById(data[i].id)
          height += itemEl ? itemEl.scrollHeight : 0
        }
        let canScroll = height > document.body.scrollHeight * 0.50 // 高度要比滚动盒子小

        // 开始滚动
        let flag = document.getElementById('scroll-into-view')
        if (!canScroll) {
          // console.log('不可滚动');
          if (flag) flag.style.display = 'none'
        } else {
          if (id && index > 0) {
            // console.log('可滚动, 有id并且不是第一条');
            if (flag) flag.style.display = 'none'
            document.getElementById(id).scrollIntoView()
          } else {
            // console.log('可滚动, 无id或id为第一条');
            if (flag) flag.style.display = 'block'
            document.getElementById('scroll-into-view').scrollIntoView()
          }
        }
      }, 0);
    },

    // 地区列表点击
    onDistrictItemClick (item) {
      this.selectDistrict(item)
      // 设置下一等级
      let nextLevel = parseInt(item.level) + 1
      if (nextLevel <= 4 && !_.isEmpty(this.district[nextLevel]) && this.district[nextLevel].parentId == item.id) {
        this.setCurrentLevel(nextLevel)
      } else {
        // 清除子地区无效数据，恢复未选状态
        this.clearSubDistrict(item)
        // 异步
        this.setDistrictChildren(item.id, nextLevel)
      }
    },

    // 选择地区
    selectDistrict (item) {
      this.district_id = item.id
      this.district[item.level].id = item.id
      this.district[item.level].name = item.name
    },

    // 清空子地区（当子地区数据不属于当前所选地区数据）
    clearSubDistrict (item) {
      for (let level = parseInt(item.level+1); level <= 4; level++) {
        Vue.set(this.district, level, null)
      }
    },

     /* [获取下个地区数据]
     * @param Number id 地区id
     * @param Number level 子地区等级
     * @param Function success 成功回调
     */
    setDistrictChildren (parentId, level) {
      if (!_.isEmpty(this.district[level]) && !_.isEmpty(this.district[level].levelData)) {
        this.setCurrentLevel(level)
        return
      }
      else if (level <= 4) {
        this.loading = true
        Api.request (
          {
            url: 'member/address/district-children',
            method: 'GET',
            params: { id: parentId },
          },
          (res) => {
            let data = res.data.district
            if (!_.isEmpty(data)) {
              this.$set(this.district, level, {
                id: !!this.district[level] ? this.district[level].id : null,    // 所选本级地区id, 修改地址直接取原来已选数据
                parentId: parentId,   // 父级所选id
                name: !!this.district[level] ? this.district[level].name : null,  // 所选本级地区名称
                level: level,         // 本级地区等级
                levelData: data,      // 本级地区数据
                levelAlias: this.levelAliases[level], // 本级地区行政区别名
              })
              this.setCurrentLevel(level)
            }
            this.loading = false
          },
          (res) => {}
        )
      }
    },

    // 修改地址时异步更新相关地区数据
    readPropsDistrict () {
      if (this.data.district_id) {
        Api.request (
          {
            url: 'member/address/district-fullpath',
            method: 'GET',
            params: { end_id:  this.data.district_id},
          },
          (res) => {
            if (!_.isEmpty(res.data)) {
              let data = _.orderBy(res.data.path_data, 'level', 'asc') // 按省->镇的顺序获取
              _.forEach(data, (value) => {
                Vue.set(this.district, value.level, {
                  id: value.id,         // 所选本级地区id
                  name: value.name,     // 所选本级地区名称
                  level: value.level,   // 本级地区等级
                })
                // 延迟设置各子地区数据, (从省级开始，所以子地区等级+1)
                _.delay(() => {
                  this.setDistrictChildren(value.id, value.level + 1)
                }, 1000 * (value.level + 1));
              })
            }
          },
          (res) => {}
        )
      }
    },

    validName() {
      let v = Validator.validate({
          value: this.name,
          rules: 'required|min_length(2)|max_length(20)',
          errors: '姓名不能为空|姓名最小2个字符|姓名最大20个字符'
       })
       if (v.error) this.$toast(v.error)
       return v
    },
    validMobile() {
      let v = Validator.validate({
          value: this.mobile,
          rules: 'required|mobile',
          errors: '手机号码不能为空|手机号码格式不正确'
       })
       if (v.error) this.$toast(v.error)
       return v
    },
    validAddress() {
      let v = Validator.validate({
          value: this.address,
          rules: 'required|min_length(4)|max_length(30)',
          errors: '详细地址不能为空|详细地址最小4个字符|详细地址最大30个字符'
       })
       if (v.error) this.$toast(v.error)
       return v
    },
  },
  // END methods
  created() {
    if (this.data.district_id) {
      this.readPropsDistrict()
    }
    else if(_.isEmpty(this.data.district_id)) {
      // this.setDistrictChildren(0, 0) // 从港台开始选
      this.setDistrictChildren(100000, 1)  // 从省级开始选
      // this.setDistrictChildren(510722, 4) // 本地区县级内选择，需要预设上级地区数据
    }
  }
}
</script>
<style scoped lang="less">
@import '../../ui/styles/_vars.less';

.district-select {
  width: 100%;
  height: 65%;   // 修改此处高时要修改滚动高
  text-align: center;
  background: #fff;

  .select-tab-item {
    padding: 3px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ul {
    display: block;;
    align-items: center;
    margin: 60px 0;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 44px;
      color: @semi;
      font-size: 16px;
      list-style: none;
      &.selected {
        color: @brand;
      }
    }
  }

}
</style>
