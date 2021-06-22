/**
 * 这个模块发送ajax请求并返回数据封装多个请求并向外暴露
 */
import axios from 'axios';

/**
 * base_url： 主要数据请求的api
 */

// const base_url = 'https://elm.cangdu.org/';

/*向外暴露获取当前城市的请求模块*/
export const guessCity = axios.get(`/v1/cities`, {
  params: {
    type: 'guess',
  }
});

/*向外暴露获取当前最火城市的模块*/
export const hotCity = axios.get(`/v1/cities`, {
  params: {
    type: 'hot',

  }
});

/*发送请求获取全部城市 并向外暴露*/
export const groupCity = axios.get(`/v1/cities`, {
  params: {
    type: 'group',
  }
});

/*发送请求获取所选中城市的信息 并向外暴露*/
//将selectCity封装成一个函数由前台调用并传值
export const selectCity = id => axios.get(`/v1/cities/${id}`, {});

/*发送请求获取搜索的城市具体的地点,并封装给其他组件使用*/
export const search_keyword = (id, keyword) => axios.get(`/v1/pois`, {
  params: {
    city_id: id,
    keyword,
    type: 'search'
  }
});

/*通过经纬度进行详细定位 请求数据并向外暴露*/
export const geoHashAddress = geoHash => axios.get(`/v2/pois/${geoHash}`, {});

/*获取食品分类的数据 请求数据并向外暴露 https://elm.cangdu.org/v2/index_entry*/
export const foodEntry = axios.get(`/v2/index_entry`, {});

/*获取附近商家的列表，并暴露给外部 需要两个参数经度和纬度*/
export const shopList = async function (latitude, longitude) {
  return await axios.get(`/shopping/restaurants`, {
    params: {
      latitude,
      longitude
    }
  })
}

/*封装搜索餐馆的api 并向外暴露*/
export const searchRestaurant = (geohash, keyword) => axios.get(`/v4/restaurants`, {
  params: {
    geohash,
    keyword,
    _: new Date().getTime(),
  }
});

/*封装请求： 获取所有商铺分类列表， 并暴露给food这个组件*/
export const shopCategory = async () => axios.get(`/shopping/v2/restaurant/category`, {});

/*封装请求 获取配送方式 并暴露 该api主要是给food这个组件*/
export const foodDelivery = async (latitude, longitude) => axios.get(`/shopping/v1/restaurants/delivery_modes`, {
  params: {
    latitude,
    longitude
  }
});

/*封装请求： 获取商家属性活动列表 并暴露 该api主要是给food这个组件进行使用*/
export const foodActivity = async (latitude, longitude) => axios.get(`/shopping/v1/restaurants/activity_attributes`, {
  params: {
    latitude,
    longitude
  }
});

/*获取筛选过的商铺列表 暴露给shopList组件*/
export const sortShopList = async (latitude, longitude, offset, limit,restaurant_category_ids, restaurant_category_id, order_by, delivery_mode, support_ids,) => {
  let supportStr = support_ids.forEach(item => {
      if (item.status) {
        supportStr = item.id
      }
    });
  return  await axios.get(`/shopping/restaurants`, {
    params: {
      latitude,
      longitude,
      offset,
      limit,
      'extras[]': 'activities',
      keyword: '',
      'restaurant_category_ids[]': restaurant_category_ids,
      restaurant_category_id,
      order_by: order_by ,
      'delivery_mode[]': delivery_mode,
      'support_ids[]': supportStr,
    }
  })
};

/*封装shop组件里面的食物分类的所有的数据*/
export const GetGoodsMenu = async (id) => axios.get(`/shopping/v2/menu`,{
  params: {
    restaurant_id : id
  }
});

/* 封装餐馆详细信息api */
export const shopDetail = async (id) => axios.get(`/shopping/restaurant/${id}`,{

})

/* 封装请求获取店铺评价信息 /ugc/v2/restaurants/1/ratings?offset=0&limit=10 */
export const getShowRating = async (id) => axios.get(`/ugc/v2/restaurants/${id}/ratings`,{
  params: {
    offset: 0, // 跳过
    limit: 100, // 单次获取20条
  }
})

/* 封装 获取评价分类api 给shipRatings使用 */
export const getRatingMenu = async (id) => axios.get(`/ugc/v2/restaurants/${id}/ratings/tags`,{

})

// 获取评价分数 
export const getRatingScore = async (id) => axios.get(`ugc/v2/restaurants/${id}/ratings/scores`,{
  
})


