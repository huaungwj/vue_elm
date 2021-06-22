<template>
  <div class="shop_detail">
    <head-top>
      <i @click="$router.back()" class="iconfont icon-xiazai6" slot="left"></i>
      <span class="shopTop" slot="center">商家详情</span>
    </head-top>
    <!-- 活动与属性 -->
    <section class="activity_container">
      <header>活动与属性</header>
      <ul class="actibities_ul">
        <li v-for="(item,index) in shopDetail.activities" :key="index">
          <span :style="{'backgroundColor' : `#${item.icon_color}`}">减</span>
          <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
      <ul class="actibities_ul">
        <li v-for="(item,index) in shopDetail.supports" :key="index">
          <span :style="{'backgroundColor':`#${item.icon_color}`}">保</span>
          <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
    </section>
    <!-- 食品监督公示 -->
    <section class="shop_status_container">
      <router-link class="shop_status_header" :to="{path:`/shop/shopDetail/shopSafe`,query: {id:$route.query.id}}">
        <span class="shop_detail_title">食品监督安全公示</span>
         <div>
          <span>企业认证详细</span>
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </router-link>
      <section class="shop_status_detail">
        <!-- color: 7ed361 绿色 -->
        <!-- color: FF0000 红色 -->
        <i v-if="shopDetail.status == 1" style="color: rgb(126, 211, 33);font-size: 47px;margin-bottom:15px;" class="iconfont icon-haoping"></i>
        <i v-else style="color: rgb(208, 2, 27);font-size: 47px" class="iconfont icon-chapingtongzhi"></i>
        <div class="check_date">
          <p>
            <span>监督检查结果：</span>
            <span v-if="shopDetail.status == 1" style="color: #7ed361">良好</span>
            <span v-else style="color: #FF0000">差</span>
          </p>
           <p>
            <span>检查日期：{{date}}</span>
            <span></span>
          </p>
        </div>
      </section>
    </section>
    <!-- 商家信息 -->
    <section class="shop_info">
      <header class="shop_info_header">
        商家信息
      </header>
      <p>效果演示</p>
      <p>地址：广东省广州市越秀区中山五路219号华联购物中心F1</p>
      <p>营业时间：[8:30/20:30]</p>
      <p>
        <span>营业执照</span>
        <i class="iconfont icon-arrow-right"></i>
      </p>
      <p>
        <span>餐饮服务许可证</span>
        <i class="iconfont icon-arrow-right"></i>
      </p>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
/* 引入需要用到的组件 */
import headTop from "../../../components/headTop/headTop";
/* 引入vuex辅助函数 */
import {mapState} from 'vuex';
import moment from 'moment'
export default {
  name: "ShopDetail",
  components: {
    headTop,
  },
  data() {
    return {
      date: moment().format("YYYY-MM-DD HH:mm:ss")
    };
  },
  mounted() {
    
  },
  computed: {
    ...mapState(['shopDetail']),
  },
};
</script>

<style lang="stylus" scoped>
/* 转换 */
px2rem(designpx) {
  $rem = 37.5px;
  return (designpx / $rem) rem;
}

/* 最外层的div */
.shop_detail {
  width: 100vw;
  height: 100vh;
  background-color: #ebebeb;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 18;
  font-size: px2rem(16px);
  color: #333;

  // 返回图标
  .icon-xiazai6 {
    color: #fff;
  }

  // 属性和活动section
  .activity_container {
    margin-top: px2rem(54px);
    margin-bottom px2rem(10px)
    display: flex;
    flex-direction: column;
    background-color #fff
   

    // 头部
    header {
      font-size: px2rem(17.5px);
      padding-left: px2rem(14px);
      margin-bottom: px2rem(7px);
      line-height: px2rem(43px);
      border-bottom: px2rem(1px) solid #f1f1f1;
    }

    // 内容
    .actibities_ul {
      padding-left: px2rem(14px);

      // li
      li {
        margin-bottom: px2rem(5px);
        line-height px2rem(31px)
        
        // span
        span:nth-of-type(1) {
          font-size: px2rem(12px);
          color: #fff;
          padding: px2rem(5px);
          border-radius: px2rem(2px);
          margin-right: px2rem(6px);
          border: px2rem(1px);
        }

        span:nth-of-type(2) {
          font-size: px2rem(12.5px);
          color #666
          letter-spacing px2rem(1px) 
        }
      }
    }
  }

  /* 食品监督安全公示 */
  .shop_status_container {
    background-color #fff
    margin-bottom px2rem(10px)
    
    /* 头部链接跳转 */
    .shop_status_header { 
      display flex
      padding 0 px2rem(14px)
      justify-content space-between
      align-items center
      line-height px2rem(46px)
      border-bottom px2rem(1px) solid #f1f1f1
      & > span{
        font-size px2rem(17.5px)
        color #333
      }
      & > div > span {
        color #bbb
        padding-right px2rem(2px)
      }
    }
    
    /* 内容区域 */
    .shop_status_detail {
      padding px2rem(14px)
      display flex
      align-items center
      .check_date{
        font-size px2rem(12.8px)
        margin-left px2rem(13px)
        color #666
        p{
          line-height px2rem(31px)
        }
      }
    }

  }

  /* 商家信息部分 */
  .shop_info{
    background-color #fff
    padding 0 px2rem(14px)
    .shop_info_header{
      border-bottom px2rem(1px) solid #f1f1f1
      line-height px2rem(43px)
      font-size px2rem(17.5px)
    }
    p{
      color #666
      padding px2rem(16.4px) px2rem(14px) px2rem(16.4px) 
      font-size px2rem(14px)
      line-height px2rem(16px)
      border-bottom px2rem(1px) solid #f1f1f1
      display flex
      justify-content space-between
    }
  }

}
</style>