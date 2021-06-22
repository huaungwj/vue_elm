<template>
  <div>
    <!--头部组件-->
    <head-top>
      <a style="color: #fff" slot="left" @click="$router.back()">
        <i style="color: #fff;" class="iconfont icon-arrow_left"></i>
      </a>
      <span style="color: #fff;" slot="center">{{city_name}}</span>
      <router-link slot="right" to="/home">
        <span style="color: #fff">切换城市</span>
      </router-link>
    </head-top>
    <!--输入搜索城市表单-->
    <form class="city_form">
      <div>
        <input type="text" placeholder="输入学校、商务楼、地址" class="city_input input_style" v-model="search_title">
      </div>
      <div>
        <input type="submit" value="提交" class="city_submit input_style" @click.prevent="search_keywords">
      </div>
    </form>
    <search-history>
      <!--搜索标题-->
      <header class="search_history" v-if="search_flag" slot="search_history">搜索历史</header>
      <ul slot="history_list" class="history_list">
        <!--搜索历史-->
        <div v-if="search_flag">
          <li v-for="(address) in place_history" :key="address.address"
              @click="goTo(`${address.geohash}`,address)">
            <h4 class="search_name ellipsis">{{address.name}}</h4>
            <p class="search_address ellipsis">{{address.address}}</p>
          </li>
        </div>
        <!--搜索列表-->
        <div v-if="!search_flag">
          <li v-for="(address) in search_data" :key="address.address"
              @click="goTo(`${address.geohash}`,address)">
            <h4 class="search_name ellipsis">{{address.name}}</h4>
            <p class="search_address ellipsis">{{address.address}}</p>
          </li>
        </div>
      </ul>
      <!--清空所有-->
      <footer slot="clear_all_history" class="clear_all_history" v-if="search_flag" @click="delectPlaceHistory">
        清空所有
      </footer>
    </search-history>

  </div>
</template>

<script>
  /*引入头部组件*/
  import headTop from "../../components/headTop/headTop";
  import SearchHistory from "../../components/SearchHistory/SearchHistory";
  import {selectCity, search_keyword} from "../../service/getData" // 引入封装好的请求api
  import {setStore, getStore, removeStore} from "../../config/utils"; //引入封装好的localstorage方法
  /*message 消息弹框*/
  import 'muse-ui-message/dist/muse-ui-message.css';
  import Vue from 'vue';
  import Message from 'muse-ui-message';
  Vue.use(Message);



  export default {
    name: "SelectCity",
    /*映射标签*/
    components: {
      headTop,
      SearchHistory
    },
    /*数据*/
    data() {
      return {
        city_name: '', // 当前城市的名称
        city_id: '', // 当前城市的id
        search_title: '', // 搜索的关键词
        search_flag: true,  // 搜索的时候变为false 隐藏搜索历史标题
        search_data: [], /*搜索回来的信息*/
        place_history: [].length = 7, //历史的选中城市记录
      }
    },

    methods: {
      /*请求搜索的信息*/
      search_keywords() {
        //1.判断输入的合法性
        if (!this.search_title.trim()) {
          // MessageBox.alert('请输入内容后再继续')
          this.$alert('请输入内容后再继续', '提示', {
            okLabel: '知道了'
          })
          return
        }
        /*2.发送请求*/
        this.search_flag = false;
        search_keyword(this.city_id, this.search_title).then(
          res => {
            // console.log(res.data) //成功 返回一个数组
            this.search_data = res.data; //赋值
            // console.log(this.search_data)
          }
        )
      },

      /*路由跳转并传值*/
      /*参数为经纬度*/
      goTo(geohash, address) {
        /*设置localstorage本地存储*/
        //1.获取数据并把数据插入进行存储
        if (getStore('placeHistory')) {
          //获取数据
          let getStoreData = JSON.parse(getStore('placeHistory'));
          //2.判断数据是否重复
          const filter = getStoreData.filter(city => !(city.name === address.name)); //过滤出是否存在重复的
          getStoreData = filter;
          getStoreData.unshift(address) //新增数据
          setStore('placeHistory', getStoreData); // 插入
        } else {
          const getStoreData2 = []; // 获取数据
          getStoreData2.unshift(address) //新增数据
          setStore('placeHistory', getStoreData2);//插入
        }
        // console.log(address) //成功
        /*跳转路由到mSite*/
        this.$router.push({
          path: '/mSite',
          query: {
            geohash
          }
        })
      },

      /*删除所有的历史记录*/
      delectPlaceHistory() {
        removeStore('placeHistory');
        this.place_history = [];
      }

    },

    mounted() {
      /*获取请求的参数id*/
      this.city_id = this.$route.params.id;
      /*发送请求获取选中城市信息*/
      selectCity(this.city_id).then(
        (res) => // console.log(res.data) // 成功 得到当前选中的城市信息
          this.city_name = res.data.name // 赋值
      );

      /*获取localStorage里面的历史搜索城市记录*/
      this.place_history = JSON.parse(getStore('placeHistory'));
      // console.log(this.place_history)
      if (this.place_history) {
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  px2rem(designpx)
    $rem = 37.5px; //10rem = 375
    return (designpx / $rem) rem
    @import "../../common/stylus/mixins.styl"

  i
    font-size px2rem(24px)

  span
    font-size px2rem(15px)

  .city_form
    top-border-1px(#e4e4e4)
    border-bottom px2rem(1px) solid #e4e4e4
    border-top px2rem(1px) solid #e4e4e4
    margin-top px2rem(59px)
    background-color #ffffff
    padding-top px2rem(10px)
    margin-bottom px2rem(10px)

    div
      width: 90%
      text-align center
      margin 0 auto

      .city_input
        outline none
        border px2rem(1px) solid #e4e4e4
        color #333
        font-size px2rem(16px)

      .input_style
        width 100%
        margin-bottom px2rem(10px)
        height px2rem(33px)
        border-radius px2rem(3px)
      input:

      :-webkit-input-placeholder
        text-indent px2rem(15px)
        color #666

      .city_submit
        background-color #3190E8
        color #ffffff
        font-size px2rem(17px)

  .search_history
    text-indent px2rem(7px)
    font-size px2rem(12px)
    margin-bottom px2rem(3px)
    font-weight 600
    color #666

  .history_list
    display flex
    flex-direction column
    bakckground-color #fff

    li
      background-color #fff
      border-bottom px2rem(1px) solid #e4e4e4
      border-top px2rem(1px) solid #e4e4e4
      padding-top px2rem(16px)
      text-indent px2rem(10px)

      h4
        color #333
        font-size px2rem(16px)
        margin-bottom px2rem(10px)
        font-weight bolder

      p
        font-size px2rem(12px)
        color #999
        margin-bottom px2rem(10px)
        font-weight 500

  .clear_all_history
    color #666
    font-size px2rem(16px)
    height px2rem(46px)
    text-align center
    line-height px2rem(46px)
    background-color #fff


</style>

