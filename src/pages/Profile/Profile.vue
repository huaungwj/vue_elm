<template>
  <div class="profile_page">
    <!-- 头部组件 -->
    <head-top>
      <a style="color: #fff" slot="left" @click="$router.back()">
        <i style="color: #fff; font-size: 24px" class="iconfont icon-arrow_left"></i>
      </a>
      <a style="color: #fff" href="#" slot="center">
        <span style="color: #fff;font-size: 20px">我的</span>
      </a>
    </head-top>
    <!-- 内容 -->
    <section>
      <!-- 个人信息 头像 -->
      <section class="profile-number">
        <img src="https://elm.cangdu.org/img/default.jpg" alt="">
        <div class="user-info">
          <p>18200975370</p>
          <p>
            <i class="iconfont icon-shouji3"></i>
            <span class="icon-mobile-number">暂无绑定手机号</span>
          </p>
        </div>
        <i class="iconfont icon-jiantou1"></i>
      </section>
      <!-- 用户信息 余额等 -->
      <section class="info-data">
        <ul>
          <li>
            <span class="info-data-top"><b style="color: #f90">0.00</b>元</span>
            <span class="info-data-bottom">我的余额</span>
          </li>
          <li>
            <span class="info-data-top"><b style="color: #ff5f3e">3</b>个</span>
            <span class="info-data-bottom">我的优惠</span>
          </li>
          <li>
            <span class="info-data-top"><b style="color: #6ac20b">0</b>分</span>
            <span class="info-data-bottom">我的积分</span>
        </li>
        </ul>
      </section>
      <!-- 我的订单 积分商城 -->
      <section class="profile-1reTe">
        <ul>
          <li>
            <i style="color: #787878" class=" iconfont icon-option2"></i>
            <span>我的订单</span>
            <i style="padding-right: 5px; color: #bbb;" class="iconfont icon-arrow-right"></i>
          </li>
          <li>
            <i style="color: rgb(252, 123, 83)" class=" iconfont icon-daojushangcheng"></i>
            <span>积分商城</span>
            <i style="padding-right: 5px; color: #bbb;" class="iconfont icon-arrow-right"></i>
          </li>
          <li>
            <i style="color: rgb(255, 198, 54)" class=" iconfont icon-huangguan"></i>
            <span>饿了么会员卡</span>
            <i style="padding-right: 5px; color: #bbb;" class="iconfont icon-arrow-right"></i>
          </li>
        </ul>
      </section>
    </section>
    <!-- 服务中心 -->
    <section class="profile-1reTe">
      <ul>
        <li>
          <i style="color: #3190e8;font-size:18px;" class="iconfont icon-fuwuzhongxin1"></i>
          <span>服务中心</span>
          <i style="padding-right: 5px; color: #bbb;" class="iconfont icon-arrow-right"></i>
        </li>
         <li>
          <i style="color: #3190e8;font-size: 18px;" class="iconfont icon-waimaiAPP"></i>
          <span>下载饿了么APP</span>
          <i style="padding-right: 5px; color: #bbb;" class="iconfont icon-arrow-right"></i>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
/* 引入头部组件 */
  import headTop from "../../components/headTop/headTop";

  export default {
    name: "Profile",
    components: {
      headTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
px2rem(designpx) {
  $rem = 37.5px;
  return (designpx / $rem) rem;
}
/* 最外层的盒子 */
.profile_page{
  width 100vw
  background-color #f5f5f5
  /* 头像手机信息 */
  .profile-number{
    display flex
    margin-top px2rem(44px)
    background-color #3190e8
    color #fff
    font-size px2rem(16px)
    justify-content space-between
    padding px2rem(15.6px) px2rem(14px)
    align-items center
    /*  头像 */
    img{
      width px2rem(59px)
      height px2rem(59px)
      border-radius 50%
    }
    /* 用户名 电话 */
    .user-info{
      flex-grow 1
      margin-left px2rem(11px)
      & > p:nth-of-type(1) {
        font-size px2rem(18px)
        line-height px2rem(23px)
        padding-bottom px2rem(3px)
      }
      /* 电话 */
      & > p > span{
        font-size px2rem(13.4px)
        font-weight 400
        padding-left px2rem(3px)
        font-family Helvetica Neue,Tahoma,Arial
      }
    }
  }
  /* 用户信息 余额等 */
  .info-data{
    width 100vw
    font-size px2rem(13.4px)
    color #333
    margin-bottom px2rem(10px)
    background-color #fff
    ul{
      display flex
      li{
        display flex
        flex-direction column
        width 33.33%
        align-items center
        border 1px solid #f1f1f1
        .info-data-top{
           padding px2rem(20px) 0 px2rem(10px)
           b{
             color #f90
             font-size px2rem(28px)
           }
        }
        .info-data-bottom{
          font-size px2rem(13px)
          color #666
          padding-bottom px2rem(13.5px)
        }
      }
    }
  }

  /* 我的订单 积分商城 */
  .profile-1reTe{
    width 100vw
    background-color #fff
    margin-bottom px2rem(10px)
    font-size px2rem(16px)
    ul{
      display flex 
      flex-direction column
      padding-left px2rem(20px)
      li{
        line-height px2rem(44px)
        display flex
        border-bottom 1px solid #f1f1f1
        font-family Helvetica Neue,Tahoma,Arial
        span{
          padding-left px2rem(10px)
          flex-grow 1
        }
      }
    }
  }

}
</style>
