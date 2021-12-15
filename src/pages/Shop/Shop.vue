<template>
  <div>
    <!--装载整个shop页面的div-->
    <section class="shop_container">
      <!--返回按钮-->
      <nav class="go_back" style="z-inde: 100">
        <router-link
          :to="{ path: '/mSite', query: { geohash: $store.state.geohash } }"
        >
          <i
            @click="$router.back()"
            class="iconfont icon-jiantou2"
            style="color: #fff;font-size:25px"
          ></i>
        </router-link>
      </nav>

      <!--header 商家头部信息-->
      <header class="shop_detail_header">
        <router-link :to="{ path: '/shop/shopDetail', query: { id: shopId } }">
          <!--背景图片容器-->
          <div class="header_cover_img_con">
            <img
              class="header_cover_img"
              :src="`${img_base}${shopInfo.image_path}`"
              alt=""
            />
          </div>
          <!--header 商家的描述信息-->
          <section class="description_header">
            <!--链接到商家的详细页面-->
            <a href="#" class="description_top">
              <!--商家门店的左边图片部分-->
              <section class="description_left">
                <img :src="`${img_base}${shopInfo.image_path}`" alt="" />
              </section>
              <!--商家主要的简单描述-->
              <section class="description_right">
                <h4 class="description_title">{{ shopInfo.name }}</h4>
                <p class="description_text">
                  商家分送 / 分钟送达 /
                  {{ (shopInfo.piecewise_agent_fee || {}).tips }}
                </p>
                <p class="description_promotion ellipsis">
                  公告：{{ shopInfo.promotion_info }}
                </p>
              </section>
              <!--最右边的前进按钮-->
              <i class="iconfont icon-jiantou1 icon-style"></i>
            </a>
          </section>
        </router-link>
      </header>
      <!--商品 分类切换盒子-->
      <section class="change_show_type">
        <router-link
          :to="{
            path: `/shop/shopmenu`,
            query: { geohash: $route.query.geohash, id: $route.query.id },
          }"
          class="products toggle_menu"
        >
          <span class="products_text change_text_style">商品</span>
        </router-link>
        <router-link
          :to="{
            path: `/shop/shopratings`,
            query: { geohash: $route.query.geohash, id: $route.query.id },
          }"
          class="eval toggle_menu"
        >
          <span class="eval_text change_text_style">评价</span>
        </router-link>
      </section>
      <router-view />
    </section>
  </div>
</template>

<script>
/*引入相关的组件*/
import ShopMenu from './ShopMenu/ShopMenu';
import ShopRatings from './ShopRatings/ShopRatings';
import { shopDetail } from '../../service/getData';

export default {
  name: 'Shop',
  components: {
    ShopMenu,
    ShopRatings,
  },
  created() {
    this.geohash = this.$route.query.hash;
    this.$store.dispatch('saveShopId', { shopId: this.$route.query.id });
    this.shopId = this.$store.state.shopId;
  },
  data() {
    return {
      geohash: '', // 经纬度信息
      shopId: '', // 商家信息Id
      shopInfo: {}, // 商家信息
      img_base: 'https://elm.cangdu.org/img/', // img 域名路径
    };
  },
  methods: {
    async _initData() {
      shopDetail(this.$store.state.shopId).then((res) => {
        // 发送请求 获取商家信息的数据
        // 判断是否存在数据
        if (res.data) {
          this.shopInfo = res.data;
          this.$store.dispatch('saveShopInfo', { shopDetail: this.shopInfo });
        }
        // console.log(res.data); // 成功获取一个保存商家信息的对象
      });
    },
  },
  mounted() {
    this._initData();
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
px2rem(designpx)
  $rem = 37.5px
  return (designpx / $rem) rem

/*整个shop组件*/
.shop_container
  position absolute
  display flex
  flex-direction column
  right 0
  top 0
  height 100vh
  overflow hidden
  background-color #f5f5f5
  /*导航nav回退按钮部分*/

  .go_back
    width 100%
    height px2rem(47px)
    position fixed
    top 0
    left 0
    display flex
    align-items flex-start
    padding px2rem(5.2px) 0 0 px2rem(5.2px)
    z-index 11

  /*商家描述部分头部*/

  .shop_detail_header
    width: 100vw
    position relative
    left 0
    top 0
    z-index 10
    /*height px2rem(97.19px)*/
    /*装载商家背景图片的部分*/

    .header_cover_img_con
      height 100%
      overflow hidden
      width 100%
      z-index 9
      position absolute

      .header_cover_img
        filter blur(px2rem(10px))
        height 100%
        width 100%
        position absolute
        left 0
        top 0

    /*商家描述部分*/

    .description_header
      position relative
      z-index 11
      background rgba(119, 103, 137, 0.43)
      width 100%
      overflow hidden
      padding px2rem(10px)
      padding-top px2rem(20px)
      padding-right 0
      /*商家描述整个a标签部分*/

      .description_top
        display flex
        /*商家描述左边图片部分*/

        .description_left
          margin-right px2rem(10px)

          img
            width px2rem(75px)
            height px2rem(75px)

        /*商家描述右边文字*/

        .description_right
          color #fff
          /*标题部分*/

          .description_title
            font-size px2rem(18px)
            margin-bottom px2rem(13px)

          /*运送 小费部分*/

          .description_text, .description_promotion
            font-size px2rem(12px)
            margin-bottom px2rem(13px)
            font-weight lighter

          .description_promotion
            width 95%
            margin-bottom px2rem(0px)

        /*最右边的前进按钮*/

        .icon-style
          position absolute
          right px2rem(10px)
          top 50%
          z-index 11
          color #fff

  /*商品 评价切换盒子样式*/

  .change_show_type
    display flex
    width 100%
    border px2rem(2px) solid #ebebeb
    background-color #fff
    padding px2rem(7.8px) 0 px2rem(14.3px)
    z-index 10
    /*每个div*/

    .toggle_menu
      flex 1
      text-align center
      /*div下面的span*/
      display flex
      align-items center
      justify-content center
      height px2rem(28px)

      .change_text_style
        font-size px2rem(16px)
        color #666
        border-bottom px2rem(3px) solid #fff
        padding px2rem(2.5px) px2rem(5px)
        box-sizing content-box
        padding-bottom px2rem(5px)

      .show_type_active
        color #3190e8
        border-bottom px2rem(3px) solid #3190e8


/*整个菜单盒子 menu 评价 购物车*/
.shop_container
  display flex
  flex 1
  width 100%
  padding-bottom px2rem(51.75px)

/*菜单 menu 也就是主页面显示的*/

/*路由默认选中样式*/
.router-link-exact-active
  span
    color #3190e8 !important
    border-bottom px2rem(2px) solid #3190e8 !important
</style>
