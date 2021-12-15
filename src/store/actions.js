/*状态修改*/
import { GetGoodsMenu } from '../service/getData';
import {
  GETGOODSMENU, //异步更新商家商品数据
  INCREASE_FOOD_COUNT, //同步更新food.count
  DECREASE_FOOD_COUNT, //同步更新food.count
  SAVE_FOOD_DETAIL, //设置foodDetail
  SAVE_SHOP_INFO, // 商家详细数据
  SAVE_SHOP_ID, // 保存商家Id
} from './mutations-types';

export default {
  /* revampLocation({commit},{longitude,latitude,geohash}){
    commit(REVAMPLOCATION,{longitude,latitude,geohash})
  }*/
  /* 异步更新商家商品数据 */
  async GetGoods({ commit, state }, { id, callback }) {
    GetGoodsMenu(id).then((goods) => {
      // console.log('123') //进入
      commit(GETGOODSMENU, { goods: goods.data });
    });
  },
  /* 保存商家的信息 */
  saveShopInfo({ commit }, { shopDetail }) {
    // console.log(shopDetail)
    commit(SAVE_SHOP_INFO, { shopDetail });
  },
  // 同步更新food.count
  UpdateFoodCount({ commit }, { isAdd, food }) {
    /* 增加 */
    if (isAdd) {
      commit(INCREASE_FOOD_COUNT, { food });
      /* 减少 */
    } else {
      // console.log(food);
      commit(DECREASE_FOOD_COUNT, { food });
    }
  },
  // 设置foodDetail
  saveFoodDetail({ commit }, { food }) {
    // console.dir(food);
    commit(SAVE_FOOD_DETAIL, { food });
  },
  saveShopId({ commit }, { shopId }) {
    commit(SAVE_SHOP_ID, { shopId });
  },
};
