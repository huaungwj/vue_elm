/*状态修改*/
import {
  GETGOODSMENU, //异步更新商家商品数据
  REVAMPLOCATION, //设置菜单的默认数据
  INCREASE_FOOD_COUNT, //同步更新food.count
  DECREASE_FOOD_COUNT, //同步更新food.count
  SAVE_FOOD_DETAIL, //设置foodDetail
  SAVE_SHOP_INFO, // 商家详细数据
  SAVE_SHOP_ID, // 保存商家ID
} from './mutations-types';
import Vue from 'vue';

export default {
  /* 设置数据 */
  [REVAMPLOCATION](state, { longitude, latitude, geohash }) {
    state.longitude = longitude; //设置经度
    state.latitude = latitude; //设置纬度
    state.geohash = geohash; //设置经纬度
    // console.log(state.longitude,state.latitude,state.geohash)
  },
  /* 设置菜单的默认数据 */
  [GETGOODSMENU](state, { goods }) {
    // console.log(goods); //成功返回26组数据
    state.goodsListMenu = goods;
  },
  /* 增加food.count */
  [INCREASE_FOOD_COUNT](state, { food }) {
    // 判断是否第一次点击
    if (!food.count) {
      // set 参数 object property value
      Vue.set(food, 'count', 1); // Vue中对直接往对象里面新增的属性没有数据绑定的功能，使用Vue.set()就能改变这个情况
      console.log(food);
    } else {
      // console.log(food);
      food.count++;
    }
  },
  /* 减少food.count */
  [DECREASE_FOOD_COUNT](state, { food }) {
    if (food.count > 0) {
      food.count--;
    }
  },
  // 设置foodDetail
  [SAVE_FOOD_DETAIL](state, { food }) {
    // console.log(food);
    state.foodDetail = food;
  },
  // 保存商家详细数据到vuex
  [SAVE_SHOP_INFO](state, { shopDetail }) {
    // console.log(shopDetail);
    state.shopDetail = shopDetail;
  },
  // 保存商家ID
  [SAVE_SHOP_ID](state, { shopId }) {
    state.shopId = shopId;
  },
};
