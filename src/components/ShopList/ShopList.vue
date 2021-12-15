<template>
  <!--商家列表-->

  <div
    class="shop_list_container"
    data-mu-loading-color="secondary"
    data-mu-loading-overlay-color="rgba(0, 0, 0, 0)"
    v-loading="loading"
  >
    <!--商家列表-->
    <div class="shoplist_container">
      <!--每一个商家的信息-->
      <ul v-if="shop_list.length">
        <router-link
          v-for="(shop, index) in shop_list"
          :key="shop + index"
          :to="{
            path: '/shop',
            query: { geohash: $store.state.geohash, id: shop.id },
          }"
        >
          <li class="shop_list">
            <!--左边图片-->
            <section class="shop_left">
              <img
                class="shop_img"
                :src="`${img_base}${shop.image_path}`"
                alt="商家"
              />
            </section>
            <!--右边的信息-->
            <hgroup class="shop_right">
              <!--右边头部title-->
              <header class="shop_detail_header ellipsis ">
                <h4 class="premium">{{ shop.name }}</h4>
                <ul class="shop_detail_ul">
                  <li
                    class="supports"
                    v-for="(support, index) in shop.supports"
                    :key="support + index"
                  >
                    {{ support.icon_name }}
                  </li>
                </ul>
              </header>
              <!--中间部分-->
              <div class="shop_center_message">
                <section class="star_message">
                  <!--星星组件-->
                  <Star />
                  <!--评分-->
                  <span class="rating_span">{{ shop.rating }}</span>
                  <span class="order_span"
                    >月销{{ shop.recent_order_num }}单</span
                  >
                </section>
                <!--快递方式-->
                <section class="rating_order_num_right">
                  <span class="delivery_style delivery_left">蜂鸟专送</span>
                  <span class="delivery_style delivery_right">准时达</span>
                </section>
              </div>
              <!--底部的等信息-->
              <footer class="shop_footer_msg">
                <span class="fee"
                  >￥20起送 / {{ shop.piecewise_agent_fee.tips }}</span
                >
                <p class="distance_time" style="text-align: center;">
                  <span class="distance">{{ shop.distance }} /</span>
                  <span class="time"> {{ shop.order_lead_time }}</span>
                </p>
              </footer>
            </hgroup>
          </li>
        </router-link>
      </ul>
      <ul v-else>
        <li v-for="(shop, index) in 7" :key="shop + index">
          <img src="./images/shop_back.svg" alt="back" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/*引入星星组件*/
import Star from '../Star/Star';
//引入封装好的axios请求
import { shopList, sortShopList } from '../../service/getData';
//引入vuex辅助函数
import { mapState } from 'vuex';
/*引入loading*/
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Vue from 'vue';
import Loading from 'muse-ui-loading';
Vue.use(Loading);

export default {
  name: 'ShopList',
  data() {
    return {
      shop_list: [], //存储商家列表信息
      img_base: 'https://elm.cangdu.org/img/', // 商家首页图片的api
      loading: false, //loading开启
    };
  },
  props: [
    'restaurantCategoryId',
    'restaurantCategoryIds',
    'sortByType',
    'deliveryMode',
    'supportIds',
    'confirmSelect',
    'geohash',
  ],

  //映射组件
  components: {
    Star,
  },
  created() {
    // this.geohash = this.$route.query.geohash
  },
  computed: {
    /*解耦获取state的数据*/
    ...mapState(['latitude', 'longitude']),
  },
  watch: {
    /*如果longitude的值发生变化发送axios请求*/
    longitude() {
      shopList(this.$store.state.latitude, this.$store.state.longitude).then(
        (res) => (this.shop_list = [...res.data])
      );
    },
    //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
    restaurantCategoryIds: function(value) {
      this.listenPropChange();
      value;
      //开启loading
      this.loading = true;
    },
    //监听父级传来的排序方式
    sortByType: function(value) {
      this.listenPropChange();
      //开启loading
      value;
      this.loading = true;
    },
    //监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
    confirmSelect: function(value) {
      this.listenPropChange();
      //开启loading
      this.loading = true;
      value;
    },
  },
  methods: {
    /*初始化*/
    async initData() {
      let res = await shopList(
        this.$route.query.geohash.match(/(\S*),/)[1],
        this.$route.query.geohash.match(/,(\S*)/)[1]
      );
      this.shop_list = [...res.data];
    },
    //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
    async listenPropChange() {
      let res = await sortShopList(
        this.latitude,
        this.longitude,
        0,
        20,
        this.restaurantCategoryIds,
        this.restaurantCategoryId,
        this.sortByType,
        this.deliveryMode,
        this.supportIds
      );
      //考虑到本地模拟数据是引用类型，所以返回一个新的数组
      this.shop_list = [...res.data];
      // 有值loading关闭
      if (this.shop_list.length > 0) {
        this.loading = false;
      }
      // console.log(this.shop_list)
    },
  },
  //初始化的时候触发
  mounted() {
    this.initData();
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
px2rem(designpx)
  $rem = 37.5px
  return (designpx / $rem) rem

.shoplist_container
  margin-bottom px2rem(55px)

/*最外层的商家ul*/
.shop_list_container
  background-color #fff
  border-bottom px2rem(1px) solid #e4e4e4
  margin-bottom px2rem(50px)

/*每个商家列表*/
.shop_list
  padding px2rem(17px) px2rem(10px)
  display flex
  /*商家图片*/

  .shop_img
    width px2rem(63.28px)
    height px2rem(63.28px)
    padding-right px2rem(10px)

  /*商家信息右边*/

  .shop_right
    display flex
    width 100%
    flex-direction column
    /*商家信息头部*/

    .premium::before
      content '\54C1\724C'
      height px2rem(16px)
      padding 0 px2rem(2.4px)
      margin-right px2rem(4.7px)
      color #333
      padding-top px2rem(6px)
      font-weight 600
      border-radius px2rem(2px)
      background-color #ffd930
      font-size px2rem(12.5px)

    /*商家名字部分*/

    .shop_detail_header
      width 100%
      display flex
      justify-content space-between
      /*商家title*/

      h4
        color #333
        font px2rem(15.3px) "PingFangSC-Regular"
        font-weight 700

      /*保障部分*/

      .shop_detail_ul
        display flex
        align-items center
        /*每个li*/

        .supports
          color #999
          font-size px2rem(12px)
          height px2rem(12px)
          padding px2rem(0.2px)
          margin px2rem(0.2px)
          border px2rem(0.1px) solid #f1f1f1

    /*商家信息中间内容评分部分*/

    .shop_center_message
      display flex
      justify-content space-between
      margin-top px2rem(12.2px)
      align-items center
      /*第一部分评分星星*/

      .star_message
        display flex
        align-items flex-end
        /*数据评分*/

        .rating_span
          font-size px2rem(13px)
          margin 0 px2rem(4.7px)
          font-weight bolder
          color #ff6000

        /*月销*/

        .order_span
          font-size px2rem(12px)
          color #666
          font-weight 500

      /*第二部分送餐方式*/

      .delivery_style
        font-size px2rem(12px)
        border-radius px2rem(3px)
        margin-left px2rem(1px)
        padding 0 px2rem(.4px)

      .delivery_left
        background-color #3190e8
        border px2rem(1px) solid #3190e8
        color #ffffff

      .delivery_right
        color #3190e8
        border px2rem(1px) solid #3190e8

    /*商家信息底部部分包括小费 距离*/

    .shop_footer_msg
      display flex
      margin-top px2rem(12.2px)
      justify-content space-between
      align-items center
      /*配送价格*/

      .fee
        font-size px2rem(12px)
        color #666

      /*距离*/

      .distance
        color #999
        font-size px2rem(12px)

      /*送餐时间*/

      .time
        color #3190e8
        font-size px2rem(12px)

.distance_time
  line-height px2rem(0px)
  text-align center
</style>
