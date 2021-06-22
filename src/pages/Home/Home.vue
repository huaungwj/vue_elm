<template>
  <!--包裹整个home组件的盒子 选择城市-->
  <div style="background-color: #f5f5f5">
    <!--公共组件head-top-->
    <head-top>
      <a style="color: #fff;" slot="left" @click="goTo('/home')">ele.me</a>
      <a style="color: #fff" slot="right" @click="goTo('/login')">登录 | 注册</a>
    </head-top>
    <!-- 定位选择 -->
    <nav class="city_nav">
      <div class="nav_tip">
        <span>当前定位城市: </span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <!--当前选择的城市-->
      <router-link to="/city/1">
        <div class="guess_city">
          <span>{{guess_city}}</span>
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </router-link>
    </nav>
    <!--热门城市-->
    <section class="hot_city_content">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul">
        <li v-for="(city,index) in hot_city" :key="city + index">
          <router-link style="color: #3190e8;text-align: center" :to="`city/${city.id}`">
            {{city.name}}
          </router-link>
        </li>
      </ul>
    </section>
    <!--全部的城市列表-->
    <section class="group_city_container" v-for="(citys,key,index) in sortGroupCity" :key="key + index">
      <ul class="letter_classify">
        <li class="letter_classify_li">
          <h4 class="city_title">
            {{key}}
            <span v-if="key==='A'">(按字母排序)</span>
          </h4>
          <ul class="groupname_container">
            <li v-for="(city,index) in citys" :key="city + index">
              <router-link class="ellipsis" style="color: #666" :to="`city/${city.id}`">
                {{city.name}}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  /*引入头部组件*/
  import headTop from "../../components/headTop/headTop";
  /*引入已经封装好的请求*/
  import {groupCity, guessCity, hotCity,} from '../../service/getData'
  import axios from 'axios';

  export default {
    name: "Home",
    /*存储数据*/
    data() {
      return {
        guess_city: '', // 定位的城市
        hot_city: [], //当前最火城市
        group_city: {} // 全部城市列表的数据
      }
    },
    /*映射标签*/
    components: {
      headTop
    },
    /*方法*/
    methods: {
      /*编程式跳转路由*/
      goTo(path) {
        this.$router.push(path)
      }
    },
    /*生命周期函数*/
    mounted() {

      /*获取当前最火的城市*/
      hotCity.then(
        (res) => {
          // console.log(res.data) // 成功 数组 数量8
          this.hot_city = res.data
          // console.log(this.hot_city)
        }
      );
      /*获取定位城市请求*/
      axios.get('https://elm.cangdu.org/v1/cities?type=guess').then(
        (res) => {
          // console.log(res.data)
          this.guess_city = res.data.name; /*把获取到的数据赋值*/
          console.log(this.guess_city) // 成功 广州
        }
      );

      /*获取全部城市列表*/
      groupCity.then(
        (res) => {
          // console.log(res.data) // 成功 获取到了24组数据
          this.group_city = res.data;
          // console.log(this.group_city)
        }
      );

    },

    /*计算*/
    computed: {
      sortGroupCity() {
        const sortCitys = {};
        for (let i = 65; i <= 90; i++) {
          if (this.group_city[String.fromCharCode(i)]) {
            sortCitys[String.fromCharCode(i)] = this.group_city[String.fromCharCode(i)]
          }
        }
        // console.log(sortCitys);
        return sortCitys
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /*rem转换函数*/
  px2rem(designpx)
    $rem = 37.5px; //10rem = 375
    return (designpx / $rem) rem

  /*引入混合函数 主要是上边框下边框*/
  @import "../../common/stylus/mixins.styl"

  .city_nav
    padding-top px2rem(57px)
    margin-bottom: px2rem(10px)
    background-color #fff

    /*选择城市样式*/

    .nav_tip
      bottom-border-1px(#e4e4e4)
      display flex
      justify-content space-between
      line-height px2rem(20px)
      padding 0 px2rem(10px)
      background-color #fff

      span:nth-of-type(1)
        height px2rem(32px)
        font-size px2rem(12.375px)
        color #666

      span:nth-of-type(2)
        height px2rem(32px)
        font-size px2rem(12px)
        color #9f9f9f

    /*当前选择的城市样式*/

    .guess_city
      display flex
      justify-content space-between
      align-items center
      height px2rem(40.5px)
      padding 0 px2rem(10px)

      span
        color #3190e8
        font-size px2rem(20px)
        font-weight bolder

  /*热门城市样式*/
  .hot_city_content
    top-border-1px(#e4e4e4)
    width 100vw
    background-color #fff
    margin-bottom px2rem(10px)

    .city_title
      display block
      width 100%
      text-indent px2rem(10px)
      font-weight 400
      color #666
      padding px2rem(13px) 0
      font px2rem(14px) "Helvetica Neue"
      border-bottom px2rem(1px) solid #e4e4e4

    .citylistul
      display flex
      flex-wrap: wrap

      li
        flex 1
        display flex
        align-items center
        justify-content center
        width 24%
        min-width 24%
        max-width 25%
        line-height: px2rem(40px);
        border-bottom px2rem(1px) solid #e4e4e4
        border-right px2rem(1px) solid #e4e4e4
        height px2rem(40px)
        color #3190e8
        font-weight 700

      li:nth-of-type(4)
        border-right none

  /*所有城市列表*/
  .group_city_container
    top-border-1px(#e6e6e6)
    background-color #ffffff
    margin-bottom px2rem(13px)
    border-bottom px2rem(1px) solid #e4e4e4
    /*外层ul*/

    .letter_classify
      /*外层li*/

      .letter_classify_li
        display flex
        flex-direction column
        /*显示城市手写字母*/

        .city_title
          padding px2rem(16px) 0
          text-indent px2rem(10px)
          width 100%
          font-size px2rem(14px)
          color #666
          border-bottom 1px solid #e6e6e6

        /*关于a-z的城市列表ul*/

        .groupname_container
          display flex
          flex-wrap: wrap
          /*单个城市*/

          li
            text-align center
            flex 1
            display flex
            align-items center
            justify-content center
            width 24%
            min-width 24%
            max-width 25%
            line-height: px2rem(40px);
            border-bottom px2rem(1px) solid #e4e4e4
            border-right px2rem(1px) solid #e4e4e4
            height px2rem(40px)
            color #000
            font-weight 700

            li:nth-of-type(4)
              border-right none


</style>

