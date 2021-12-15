<template>
  <div class="shopSafe">
    <!-- 头部导航条部分 -->
    <head-top>
      <i @click="$router.back()" class="iconfont icon-xiazai6" slot="left"></i>
      <span class="shopTop" slot="center">食品监督安全公示</span>
    </head-top>
    <!-- 食品监督安全公示 -->
    <section class="shop_status_container">
      <header>食品监督安全公示</header>
      <section class="shop_status_detail">
        <i v-if="shopDetail.status == 1" style="color: rgb(126, 211, 33);font-size: 47px;margin-bottom:15px;" class="iconfont icon-style icon-haoping"></i>
        <i v-else style="color: rgb(208, 2, 27);font-size: 47px" class="iconfont icon-style icon-chapingtongzhi"></i>
        <div class="check_date">
          <p>
            <span>监督检查结果：</span> 
            <span v-if="shopDetail.status == 1" style="color: #7ed361">良好</span>
            <span v-else style="color: #FF0000">差</span>
          </p>
          <p>
            <span>检查日期</span>
            <span></span>
          </p>
        </div>
      </section>
    </section>
    <!-- 工商登记信息 -->
    <section class="shop_status_container">
      <header>工商登记信息</header>
      <ul>
        <li><p>企业名称</p><p></p></li>
        <li><p>工商执照注册号</p><p></p></li>
        <li><p>注册资本</p><p></p></li>
        <li><p>注册地址</p><p></p></li>
        <li><p>属地监督所</p><p></p></li>
        <li><p>法定代表人</p><p></p></li>
        <li><p>经营范围</p><p></p></li>
      </ul>
    </section>
    <!-- 餐饮许可证 -->
    <section class="shop_status_container">
      <header>餐饮许可证</header>
      <ul>
        <li><p>营业范围</p><p></p></li>
        <li><p>许可证有效期</p><p></p></li>
        <li><p>许可证号</p><p></p></li>
        <li><p>注册地址</p><p></p></li>
        <li><p>发证时间</p><p></p></li>
        <li><p>发证机关</p><p></p></li>
      </ul>
    </section>
  </div>  
</template>

<script>
/* 引入公共的公共的头部组件 */
import headTop from "../../../../components/headTop/headTop";
/* 引入vuex辅助函数 */
import {mapState} from 'vuex';
export default {
  name: "ShopSafe",
  components: {
    headTop,
  },
  data() {
    return {};
  },
  computed :{
    ...mapState(['shopDetail']),
  },
  mounted() {
    console.log("123");
  },
};
</script>

<style lang="stylus" scoped>
/* 转换 */
px2rem(designpx) {
  $rem = 37.5px;
  return (designpx / $rem) rem;
}
// 最外层的盒子‘
.shopSafe {
  width: 100vw;
  height: 100vh;
  background-color: #ebebeb;
  position absolute
  top 0
  left 0
  padding-top px2rem(44px)
  /* 食品监督安全公示 */
  .shop_status_container{ 
    background-color #fff
    margin-bottom px2rem(10px)
    /* 头部标题 */
    header{
      font-size px2rem(17.5px)
      padding 0 px2rem(14px)
      line-height px2rem(43px)
      border-bottom px2rem(1px) solid #f1f1f1
      color #333
    }
    /* 内容 */
    .shop_status_detail{
      display flex
      align-items center
      padding px2rem(14px)
      color #666
      font-size px2rem(12.9px)
      /* 图标 */
      .icon-style{
        font-size px2rem(47px)
        color #7ed321
        padding-right px2rem(15px)
      }
      /* 检查结果和时间 */
      .check_date{
        display flex
        flex-direction column
        justify-content space-around
        height px2rem(62px)
      }
    }
    /* ul 列表信息 */
    ul{
      margin-left px2rem(23.4px)
      padding 10px 0
      font-size px2rem(12.9px)
      color #333
      li{
        margin-bottom px2rem(10px)
        line-height px2rem(23px)
      }
    } 
  }
}

.icon-xiazai6 {
  color: #fff;
}
</style>