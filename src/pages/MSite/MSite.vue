<template>
  <div>
    <head-top>
      <a style="color: #fff" slot="left" @click="goTo('./search')">
        <i style="color: #fff" class="iconfont icon-search"></i>
      </a>
      <a style="color: #fff" href="#" slot="center" @click="goTo('./home')">
        <span>{{geo_hash_address.address}}</span>
      </a>
      <a style="color: #fff" href="#" slot="right" @click="goTo('./login')">
        <span style="color: #fff">登录 | 注册</span>
      </a>
    </head-top>
    <!--滑块导航-->
    <nav class="msite_nav">
      <!--最外层盒子-->
      <div v-if="food_entry.length" class="swiper-container">
        <!--装载滑块页面-->
        <div class="swiper-wrapper">
          <div class="swiper-slide food_type_container" v-for="(page,index) in food_entry" :key="page + index">
            <router-link class="link_to_food" :to="{path:'/food',query: {geohash,restaurant_category_id: getCategoryId(food.link), title: food.title }}"
                         v-for="(food,index) in page" href="#" :key="food + index">
              <figure>
                <img :src="`${img_base}${food.image_url}`">
                <figcaption>{{food.title}}</figcaption>
              </figure>
            </router-link>
          </div>

        </div>
        <!--分页器-->
        <div class="swiper-pagination"></div>
      </div>
      <img v-else src="./images/msite_back.svg" alt="">
    </nav>

    <!--商家组件-->
    <!--    {{latitude}}-->
    <!--头部的title-->
    <header class="shop_header">
      <svg class="shop_icon" t="1603080126414" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="3690" width="50" height="50">
        <path
          d="M960.2 444.2c0 61.5-50.2 114.5-112.1 114.5-61.9 0-112.1-53-112.1-114.5 0 61.5-50.2 114.5-112.1 114.5-61.9 0-112.1-53-112.1-114.5 0 61.5-50.2 114.5-112.1 114.5s-112.1-53-112.1-114.5c0 61.5-50.2 114.5-112.1 114.5-61.9 0-112.1-53-112.1-114.5l89.7-199.5h717.6l89.5 199.5zM825.6 199.9H197.7c-27.9 0-44.8-21.8-44.8-44.8s14.1-44.8 50.5-44.8H820c33.8 0 50.5 21.8 50.5 44.8 0 23-21.6 44.8-44.9 44.8zM197.7 581.1c4.1-0.4-3.9 0.7 0 0 0.9-0.2-0.8 0.1 0 0 1.8-0.4 20.6 0.4 22.4 0 7.6-1.8 15.3 2.8 22.4 0v201.8h538.2V581.1h22.4c7.1 2.8 14.8-1.8 22.4 0 1.8 0.4-1.8-0.4 0 0 0.8 0.1-0.9-0.2 0 0 3.9 0.7-4-0.4 0 0 4.6 0.4 17.7 0 22.4 0 9.6 0 13.3 1.7 22.4 0v291.5c0 23-21.6 44.8-44.9 44.8H197.7c-23.2 0-44.8-21.8-44.8-44.8V581.1c9.1 1.7 12.8 0 22.4 0 4.8 0 17.8 0.4 22.4 0z"
          p-id="3691"></path>
      </svg>
      <span class="shop_title">附近商家</span>
    </header>
    <shop-list></shop-list>
    <!--底部组件-->
  </div>

</template>

<script>
  /*引入组件*/
  import headTop from "../../components/headTop/headTop";
  import ShopList from "../../components/ShopList/ShopList";
  /*引入封装好的axios请求*/
  import {geoHashAddress, foodEntry} from "../../service/getData";
  /*引入swiper滑动库*/
  import Swiper from 'swiper';
  import {mapMutations} from 'vuex'

  export default {

    name: "MSite",
    components: {
      headTop,
      ShopList,
    },
    data() {
      return {
        geo_hash_address: {}, //通过经纬度获取的地址
        geohash: '', //当前经纬度信息
        food_entry: [], // 食品分类
        img_base: 'https://fuss10.elemecdn.com'
      }
    },

    /*方法*/
    methods: {
      goTo(path) {
        this.$router.push(path)
      },
      ...mapMutations(['revamp_location']),
      // 解码url地址，求去restaurant_category_id值
      getCategoryId(url){
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
        // console.log(urlData)
        if (/restaurant_category_id/gi.test(urlData)) { // 如果数据中有这一串东西的话才返回数据
          // console.log(JSON.parse(urlData).restaurant_category_id.id)
          return JSON.parse(urlData).restaurant_category_id.id
        }else{
          return ''
        }
      }
    },

    /*初始化请求*/
    mounted() {
      /*创建wiper实例对象，使用模块*/
      //请求获取当前经纬度的信息
      geoHashAddress(this.$route.query.geohash).then(res => {
        this.geo_hash_address = res.data;
        this.geohash = this.$route.query.geohash
        /*将值保存到vuex里面去*/
        this.revamp_location({
          longitude: res.data.longitude,
          latitude: res.data.latitude, //纬度
          geohash: this.$route.query.geohash, //经纬度
        });

      }); //console.log(res.data)) //成功获取到了城市
      //获取食品分类的数据
      foodEntry.then(res => {
        //成功获取到了16组数据
        // console.log(res.data)
        this.food_entry.push(res.data.slice(0, 8));
        // console.log(res.data)
        this.food_entry.push(res.data.slice(8));
        // console.log(this.food_entry) //成功
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            direction: 'horizontal', // 水平切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          });
        })
      })
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  px2rem(designpx)
    $rem = 37.5px; //10rem = 375
    return (designpx / $rem) rem

  div
    font-size px2rem(16px)

  span
    font-size px2rem(16px)

  /*nav滑动模块*/
  .msite_nav
    padding-top px2rem(44px)
    margin-bottom px2rem(10px)
    height px2rem(233.63px)
    background-color #fff

    .swiper-container
      width 100%
      height 100%

      .swiper-pagination
        bottom px2rem(10px)

      .swiper-wrapper
        width 100%
        display flex
        height auto

        .swiper-slide
          width 100%

  .food_type_container
    flex-shrink 0
    display flex
    flex-wrap wrap
    z-index: 1

    a
      display flex
      text-align center
      flex-direction column
      align-items center
      width 25%
      padding px2rem(10px) 0

      img
        width px2rem(42.19px)
        height px2rem(42.19px)
        margin-bottom px2rem(7.3rem)

      figcaption
        font-size px2rem(12.809px)
        color #666


    /*附近商家title*/
    /*头部 附近商家*/

    .shop_header
      padding px2rem(10px)
      background-color #fff
      border-top px2rem(1px) solid #e4e4e4
  /*头部的icon*/
  .shop_icon
    fill #999
    width px2rem(18px)
    height px2rem(18px)
    vertical-align middle
    margin-left px2rem(10px)
  /*附近商家title*/
  .shop_title
    color #999
    font-size px2rem(12.8px)
    margin-left px2rem(5px)


</style>
