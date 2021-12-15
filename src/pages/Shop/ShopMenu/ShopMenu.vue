<template>
  <!--商品分类 主要内容部分包括左边的分类菜单 右边的单品 下边的购物车 和购物车列表-->
  <section
    class="food_container"
    data-mu-loading-color="secondary"
    data-mu-loading-overlay-color="rgba(0, 0, 0, 0)"
    v-loading="loading"
  >
    <!--整个商品分类盒子-->
    <section class="menu_container">
      <!--分类左边部分数据不会变化-->
      <section id="wrapper-menu" class="menu-left" ref="wrapperMenu">
        <ul>
          <li
            :class="{ activity_menu: currentIndex == index }"
            class="menu_left_li ellipsis"
            v-for="(good, index) in goodsListMenu"
            :key="good + index"
            @click="clickMenuLeft(index)"
            :style="{
              'margin-bottom':
                index == goodsListMenu.lenght - 2 ? '10px' : '0px',
            }"
          >
            <span>{{ good.name }}{{ goodsListMenu.lenght }}</span>
            <span class="category_num" v-if="index === 0">20</span>
          </li>
        </ul>
      </section>
      <!--菜单分类右边-->
      <section class="menu-right">
        <!--所有的li-->
        <ul ref="foodsUl">
          <!--每一个li-->
          <li v-for="(good, index) in goodsListMenu" :key="good + index">
            <!--头部信息-->
            <header class="menu_detail_header">
              <!--左边的title-->
              <section class="menu_detail_header_left">
                <strong class="menu_item_title">{{ good.name }}</strong>
                <span class="menu_item_text">{{ good.description }}</span>
              </section>
              <!--右边的....图片-->
              <!--<span class="menu_detail_header_right"></span>-->
              <i class="iconfont icon-gengduo"></i>
            </header>
            <!--商铺li-->
            <section
              class="menu_detail_list"
              v-for="(food, index) in good.foods"
              :key="food + index"
            >
              <!--商铺左边的图片-->
              <router-link
                :to="{
                  path: 'shopmenu/foodDetail',
                  query: {
                    geohash: geohash,
                    id: shopId,
                    food: JSON.stringify(food),
                  },
                }"
              >
                <div style="display: flex;">
                  <section class="menu_food_img">
                    <img :src="`${img_Base}${food.image_path}`" alt="" />
                  </section>
                  <!--商铺右边的详细描述信息-->
                  <section class="menu_food_description">
                    <!--描述信息头部-->
                    <h3 class="food_description_head">
                      <strong style="width: 98px" class="ellipsis">{{
                        food.name
                      }}</strong>
                      <div style="display: flex">
                        <span
                          v-for="(attr, index) in food.attributes"
                          :key="index"
                        >
                          <p v-if="attr">
                            {{ (attr || {}).icon_name }}
                          </p>
                        </span>
                      </div>
                    </h3>
                    <!--描述信息中间部分-->
                    <section class="food_description_content ellipsis">
                      <span class="food_content_txt ellipsis">{{
                        food.description
                      }}</span>
                      <p>{{ food.tips }}</p>
                      <span v-if="food.activity" class="food_activity">{{
                        (food.activity || {}).image_text
                      }}</span>
                    </section>
                  </section>
                </div>
              </router-link>
              <!--底部选择规格-->
              <footer class="food_description_footer">
                <p class="food_footer_txt">
                  ￥<span class="special_txt"
                    >{{ food.specfoods[0].price }} </span
                  ><span stye="color: #666"> </span>
                </p>
                <CartControl :food="food" />
              </footer>
            </section>
          </li>
        </ul>
      </section>
    </section>
    <!-- food详细页面 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!--购物车部分-->
    <section class="buy_cart_container">
      `
      <!--购物车图标和数量-->
      <section class="cart_icon_num">
        <div @click="showCartList('open')" class="cart_icon_container">
          <span class="cart_list_length">1</span>
          <i class="iconfont icon-gouwuche"></i>
        </div>
        <div class="cart_num">
          <span>￥20</span>
          <p>配送费￥5</p>
        </div>
      </section>
      <section class="gotopay">
        <a href="#" class="gotopay_button_style">去结算</a>
      </section>
    </section>
    <!--购物车列表-->
    <transition name="ShowCartList">
      <section v-show="showCartListFlag == 'open'" class="cart_food_list">
        <header>
          <h4>购物车</h4>
          <div>
            <i class="iconfont icon-shanchu"> </i>
            <span class="clear_cart">清空</span>
          </div>
        </header>
        <section id="cartFood" class="cart_food_details">
          <ul>
            <li class="cart_food_item">
              <span>ew1</span>
              <div class="cart_list_price">
                <span><span style="font-size:14px">￥</span>20</span>
                <div class="cart_list_control">
                  <i class="iconfont icon-jianshao"> </i>
                  <span class="sum">1</span>
                  <i class="iconfont icon-zengjia"> </i>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </transition>
    <div
      v-show="showCartListFlag == 'open'"
      @click="showCartList('open')"
      class="screen_cover"
    ></div>
  </section>
</template>

<script>
// 引入组件
import CartControl from '../../../components/CartControl/CartControl';
// 引入子路由组件
import FoodDetail from '../FoodDetail/FoodDetail';
/*引入滑动模块*/
import BetterScroll from 'better-scroll';
/*引入封装好的axios请求*/
import { shopDetail } from '../../../service/getData';
/*引入loading*/
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Vue from 'vue';
import Loading from 'muse-ui-loading';
Vue.use(Loading);
import { mapState } from 'vuex';

export default {
  name: 'ShopMenu',
  components: {
    CartControl,
    FoodDetail,
  },
  data() {
    return {
      showCartListFlag: '', //标识购物车列表显示隐藏
      img_Base: 'https://elm.cangdu.org/img/', // 图片路径
      scrollY: '0', // 当前右侧菜单的滚动值，他是动态的
      tops: [], // 获取的右侧菜单每一个li离父元素ul顶点的scrollTop值
      geohash: '', // 经纬度信息
      shopId: '', // 商家的ID
      loading: false, // loading层
    };
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    this.loading = true; // 当页面刷新时loading层开启
  },
  methods: {
    /*显示隐藏购物车列表*/
    showCartList(type) {
      /*不等于说明是第一次点击*/
      if (this.showCartListFlag !== type) {
        this.showCartListFlag = type;
        // console.log(this.showCartListFlag);
      } else {
        this.showCartListFlag = '';
        // console.log(this.showCartListFlag);
      }
    },
    /*发送请求获取店铺菜单数据*/
    async _initData() {
      // 获取数据 并对滚动条做操作
      this.$store.dispatch('GetGoods', {
        id: this.$route.query.id,
        callback: () => {
          // console.log(res.data) // 成功 返回26组数据
        },
      });
    },
    /* 点击左侧按钮右侧发生滚动 */
    clickMenuLeft(index) {
      // 1.获取点击的元素对应的scrollY值
      const y = -this.tops[index];
      // 2. 调用betterScroll里面的scrollTo方法 来进行右边的滚动条滚动
      this.foodsScroll.scrollTo(0, y, 300);
      // 设置当前选中的li
      this.currentIndex = index;
    },
  },
  mounted() {
    this._initData();
  },
  computed: {
    /*  菜单选中状态 */
    currentIndex: {
      get() {
        // 获取需要用到的数据
        const { scrollY, tops } = this;
        // 根据数据计算产生结果
        const index = tops.findIndex((top, index) => {
          // 条件 当亲 scrollY 必须大于当前top 并且小于 下一个top
          const addindex = index + 1;
          return scrollY >= top && scrollY < tops[addindex];
        });
        // console.log(this.scrollY,tops);
        // console.log(index);
        // 返回数据
        return index;
      },
      set(value) {},
    },

    /* vuex数据 */
    ...mapState(['goodsListMenu']), //保存带单menu的数据
  },
  watch: {
    /* 当食品分类有数据的时候触发 */
    goodsListMenu() {
      this.loading = false;
      // console.log(this.goodsListMenu)
      /*当菜单的数据获取到了就绑定滑动库的方法*/
      this.$nextTick(() => {
        // 左侧的滚动菜单
        this.scroll = new BetterScroll('#wrapper-menu', {
          movable: true,
          scrollY: true,
          click: true,
          zoom: true,
        });
        // 右侧食品菜单分类
        this.foodsScroll = new BetterScroll('.menu-right', {
          movable: true,
          zoom: true,
          probeType: 2, // 2 不会触发惯性滑动的监听 监听必须要用的值
          click: true,
        });
        //  给右侧的菜单绑定 scroll 监听
        this.foodsScroll.on('scroll', ({ x, y }) => {
          // console.log(x,y); // 成功 y值会变化
          this.scrollY = Math.abs(y); //保存
          // 1.获取左侧菜单栏的高度
          const wrapperHeight = this.$refs.wrapperMenu.clientHeight;
          // console.log(wrapperHeight) // 成功 528
          // 2.判断wrapperMenu是否定义
          if (!this.$refs.wrapperMenu) {
            return;
          }
          // 3.获取当前选中样式的菜单
          const menuList = this.$refs.wrapperMenu.querySelectorAll(
            '.activity_menu'
          );
          const el = menuList[0];
          // console.log(el); // c成功
          // 改变左侧的滚动条高度
          if (!el) return;
          // console.log(-(wrapperHeight / 2 - 50));
          this.scroll.scrollToElement(el, 800, 0, true);
        });
        this.foodsScroll.on('scrollEnd', ({ x, y }) => {
          // console.log(x,y); // 成功 y值会变化
          this.scrollY = Math.abs(y); //保存
          // console.log(this.scrollY);
        });
        // 给左边的菜单绑定滚动监听并设置
        // 1.初始化tops
        const tops = [];
        let top = 0;
        tops.push(top);
        //  2.获取右侧每个li 离父元素的顶点的高度
        const lis = this.$refs.foodsUl.children;
        // console.log(lis);
        // 3.遍历取出每一个scrollTop
        Array.from(lis).forEach((li) => {
          top += li.clientHeight;
          tops.push(top);
        });
        // console.log(tops); //成功 获取26组li元素距离父元素ul位置的数据
        tops.splice(tops.length - 2, 1, tops[tops.length - 4] + 99);
        tops.splice(tops.length - 3, 1, tops[tops.length - 4] + 50);

        // console.log(tops.length, tops.length - 1);
        this.tops = tops;
        // console.log(this.tops);
      });
    },
    $router() {
      this.loading = true;
      // console.log('123');
      this._initData();
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
px2rem(designpx)
  $rem = 37.5px
  return (designpx / $rem) rem



.menu_container
  margin-bottom 55px
  width 100vw
  height px2rem(470px)
  position relative
  display flex
  flex 1
  overflow-y hidden
  /*菜单左边 ul*/
  .menu-left
    width 26%
    height auto

    & ul > li:last-child span
      padding-bottom px2rem(10px)
    .menu_left_li
      width 100%
      padding px2rem(16px) px2rem(7.8px)
      position relative
      height px2rem(65px)
      border-bottom px2rem(1px) solid #ededed
      pointer-events: auto;

      span
        font-size px2rem(14px)
        color #666

      .category_num
        border-radius 50%
        background-color #ff461d
        position absolute
        top px2rem(10px)
        right px2rem(10px)
        font-size px2rem(13px)
        color #fff
        border px2rem(1px) solid #ff461d
        font-family Helvetica Neue, Tahoma, Arial
        text-align center

/*菜单右边部分样式*/

.menu-right
  width 75%

  height auto
  /*头部*/

  .menu_detail_header
    width 100%
    display flex
    font-size px2rem(16.5px)
    padding px2rem(12px)
    color #666
    font-weight bold
    align-items center

    .menu_detail_header_left
      height px2rem(31px)
      display flex
      align-items center
      width 90%

      .menu_item_title
        padding-right px2rem(6px)

      .menu_item_text
        font-size px2rem(12px)
        overflow hidden
        color #999


  /*中间商家内容部分 也就是里面的每一个li*/

  .menu_detail_list
    width 100%
    display flex
    flex-direction column
    background-color #fff
    padding px2rem(14px) px2rem(10px)
    border-bottom px2rem(1px) solid #f8f8f8
    /*左边图片部分*/

    .menu_food_img
      img
        width px2rem(46.88px)
        height px2rem(46.88px)
        margin-right px2rem(10px)

    /*右边shop描述信息部分*/

    .menu_food_description
      font px2rem(16px) "Microsoft YaHei"
      color #333
      width 100%

    /*h3 头部部分*/

    .food_description_head
      display flex
      justify-content space-between
      width 100%
      margin-bottom px2rem(4px)
      /*span*/
      span
        display flex

      p
        border px2rem(1px) solid rgb(240, 115, 115)
        color rgb(240, 115, 115)
        font-size px2rem(12px)
        padding 0 px2rem(1px)
        margin-left px2rem(5px)
        border-radius px2rem(2px)
        white-space nowrap
        text-align center


    /*中间内容部分*/

    .food_description_content
      width 70%

      .food_content_txt
        color #999
        font-size px2rem(12px)
        width 3%

      p
        font-size px2rem(12px)
        line-height px2rem(22px)

      .food_activity
        color rgb(240, 115, 115)
        border px2rem(1px) solid rgb(240, 115, 115)
        font-size px2rem(12px)
        padding 0 px2rem(2px)
        border-radius px2rem(3px)


    /*底部加入购物车按钮 选择规格*/

    .food_description_footer
      width 100%
      display flex
      justify-content space-between
      align-items center
      padding-top px2rem(5px)


      .food_footer_txt
        color rgb(240, 115, 115)
        font-size px2rem(12px)
        padding-left px2rem(55px)

        .special_txt
          font-size px2rem(14.5px)

      .show_chooselist
        background-color #3190e8
        color #fff
        border px2rem(1px) solid #3190e8
        border-radius px2rem(5px)
        font-size px2rem(12.8px)
        padding px2rem(2.3px) px2rem(4px)


/*购物车部分*/
/*底部购物车导航*/

.buy_cart_container
  width 100vw
  background-color #3d3d3f
  height px2rem(46px)
  position fixed
  bottom 0
  left 0
  z-index 13
  display flex

  .cart_icon_num
    flex 1

    .cart_icon_container
      display flex
      border px2rem(5px) solid #444
      border-radius 50%
      position absolute
      padding px2rem(7px)
      left px2rem(20px)
      top px2rem(-20px)
      background-color #3d3d3f
      /*购物车列表数量*/

      .cart_list_length
        font-size px2rem(12px)
        background-color #ff461d
        border-radius 100%
        position absolute
        right 0
        top px2rem(-7px)
        border px2rem(1px) solid #ff461d
        color #fff
        width px2rem(16.41px)
        height px2rem(16.41px)
        text-align center

      /*购物车图片*/

      .icon-gouwuche
        font-size px2rem(29px)
        color #fff

    .cart_num
      color #fff
      font-size px2rem(18.75px)
      display flex
      flex-direction column
      position absolute
      transform translateY(15%)
      left px2rem(100px)

      p
        margin-top px2rem(5px)
        font-size px2rem(12px)


  .gotopay
    width px2rem(118px)
    height 100%
    display flex
    justify-content center
    align-items center
    background-color #4cd964

    a
      color #fff


/*购物车商品列表*/

.cart_food_list
  width 100%
  background-color #fff
  position fixed
  z-index 12
  bottom 0
  left 0
  padding-bottom px2rem(47px)
  transform translateY(0%)
  /*购物车列表头部部分*/

  header
    background-color #eceff1
    display flex
    justify-content space-between
    align-items center
    height px2rem(45px)
    font-size px2rem(16.5px)
    padding px2rem(7px) px2rem(14px)
    color #666

    span
      padding-left px2rem(10px)
      font-size px2rem(14.5px)

  /*购物车李彪*/

  .cart_food_details
    width 100%
    display flex
    flex-direction column

    .cart_food_item
      width 100%
      height auto
      display flex
      flex-direction row
      padding px2rem(14px) px2rem(12px)
      font-size px2rem(16.5px)
      color #666
      align-items center
      justify-content space-between

      .cart_list_price
        display flex

        & > span
          color #f60
          padding-right px2rem(60px)

        .cart_list_control
          .icon-jianshao, .icon-zengjia
            color #3190e8
            width px2rem(21px)
            height px2rem(21px)
            padding 0 px2rem(5px)


/*购物车列表时候显示 遮罩*/
.screen_cover
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background-color rgba(0, 0, 0, 0.3)
  z-index 11

.ShowCartList-enter-active,
.ShowCartList-leave-active
  transition: all 0.3s;
  transform: translateY(0);

.ShowCartList-enter,
.ShowCartList-leave-active
  opacity: 0;
  transform: translateY(80%);

/* 选中左边菜单栏的li样式 */
.activity_menu
  background-color #fff
  border-left px2rem(2px) solid #3190e8
</style>
