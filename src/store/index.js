import Vuex from 'vuex'
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import Vue from 'vue';
Vue.use(Vuex);

const state = {
  longitude: '113.233001', //经度
  latitude: '23.469141', //纬度
  geohash: '23.469141,113.233001', //经纬度
  goodsListMenu: [], // 菜单页面数据
  foodDetail: {}, //食品的详细数据
  shopDetail: {}, // 商家详细信息
  shopId: '', // 保存商家ID
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});
