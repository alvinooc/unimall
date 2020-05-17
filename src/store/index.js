import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
  // 商品信息
  goodsInfo: {},
  // 商品数量
  count: 1,
  // 商品id
  sku_id: 0,
  // 是否显示商品选项
  isShowGoodsType: false,
  // 地址信息
  address: [],
  // 用户信息
  userInfo: {},
  hasLogin: false
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store