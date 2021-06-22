<template>
  <footer class="footer_guide">
    <!--首页-->
      <div class="guide_item" @click="goTo('/mSite', $store.state.geohash)" :class="{on: isCurrent('/mSite')}">
      <span class="item_icon">
        <i class="iconfont icon-elema"></i>
      </span>
        <span>饿了么</span>
      </div>
    <!--搜索-->
      <div class="guide_item" @click="goTo('/search',$store.state.geohash)" :class="{on: isCurrent('/search')}">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
        <span>搜索</span>
      </div>
    <!--订单-->
      <div class="guide_item" @click="goTo('/order')" :class="{on: isCurrent('/order')}">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
        <span>订单</span>
      </div>
    <!--我的-->
      <div class="guide_item" @click="goTo('./profile')" :class="{on: isCurrent('/profile')}">
      <span class="item_icon">
        <i class="iconfont icon-user"></i>
      </span>
        <span>我的</span>
      </div>

  </footer>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "FootGuide",
    data() {
      return {

      }
    },
    computed:{
      ...mapState['geohash']
    },


    methods: {
      /*通过接收过来的参数去替换当前的路由路径*/
      goTo(path, geohash) {
        this.$router.push({
          path: path,
          query :{
            geohash: geohash
          }
        });
      },
      /*判断当前的页面是否与浏览器的路径相匹配进行选中*/
      isCurrent(path) {
        // console.log(this.$route.path);
        return this.$route.path === path;
      }
    },


  }
</script>

<style lang="stylus" scoped>
  px2rem(designpx)
    $rem = 37.5px; //10rem = 375 1rem = 37.5
    return (designpx / $rem )rem
  @import "../../common/stylus/mixins.styl"

  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    bottom 0
    right 0
    background-color #fff
    width 100%
    height px2rem(50px)
    display flex

    .guide_item
      display flex
      flex-direction column
      flex 1
      text-align center
      align-items center
      margin px2rem(5px)
      color #999999

      &.on
        color #3190e8

      span
        font-size px2rem(12px)
        margin-top px2rem(2px)
        margin-bottom px2rem(2px)

        .iconfont
          font-size px2rem(22px)
</style>

