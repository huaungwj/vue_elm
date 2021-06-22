<template>
  <div>
    <head-top>
      <a style="color: #fff" slot="left" @click="$router.back()">
        <i style="color: #fff; font-size: 24px;" class="iconfont icon-arrow_left"></i>
      </a>
      <a style="color: #fff;" href="#" slot="center">
        <span style="color: #fff;font-size: 20px">搜索</span>
      </a>
    </head-top>
    <form class="search_form">
      <input type="search" name="search" class="search_input" v-model="search_history" placeholder="请输入商家或美食名称">
      <input type="submit" class="search_submit" name="submit" @click.prevent="restaurant(search_history)">
    </form>
    <search-history>
      <section slot="history_list" v-if="!search_history">
        <header class="search_history">搜索历史</header>
        <ul>
          <li class="history_list" v-for="(history_list,index) in search_history_list" :key="history_list">
            <span @click="restaurant(history_list)" class="history_text">{{history_list}}</span>
            <svg @click="deleteHistory(index)" xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon">
              <line data-v-ef5a3166="" x1="8" y1="8" x2="18" y2="18"
                    style="stroke: rgb(153, 153, 153); stroke-width: 3;"></line>
              <line data-v-ef5a3166="" x1="18" y1="8" x2="8" y2="18"
                    style="stroke: rgb(153, 153, 153); stroke-width: 3;"></line>
            </svg>
          </li>
        </ul>
      </section>
      <section slot="history_list" v-else>
        <header class="search_history">商家</header>
        <ul class="list_container">
          <li class="list_li" v-for="(shop,index) in search_List" :key="shop + index">
            <section class="item_left">
              <img class="restaurant_img" :src="`${img_base}${shop.image_path}`" alt="">
            </section>
            <section class="item_right">
              <div class="item_right_text">
                <p>
                  <span>美食包子铺</span>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                    <polygon  points="0,14 4,0 24,0 20,14"
                             style="fill: none; stroke: rgb(255, 96, 0); stroke-width: 1;"> </polygon>
                    <line x1="1.5" y1="12" x2="20" y2="12"
                          style="stroke: rgb(255, 96, 0); stroke-width: 1.5;"> </line>
                    <text x="3.5" y="9"
                          style="fill: rgb(255, 96, 0); font-size: 9px; font-weight: bold;">支付
                    </text>
                  </svg>
                </p>
                <p>月销 {{shop.recent_order_num}} 单</p>
                <p>{{shop.float_minimum_order_amount}} 元起送 / 距离{{shop.distance}}</p>
              </div>
            </section>
          </li>
        </ul>
      </section>
      <footer v-if="!search_history" @click="deleteAllHistory" class="clear_all_history" slot="clear_all_history">清空搜索历史
      </footer>
      <footer v-if="Search_null && search_history" class="clear_all_history" style="color: #333"
              slot="clear_all_history">很抱歉！无搜索结果
      </footer>
    </search-history>
  </div>
</template>

<script>
  import headTop from "../../components/headTop/headTop"; // 头部组件
  import SearchHistory from "../../components/SearchHistory/SearchHistory";
  import {searchRestaurant} from "../../service/getData";
  /*引入封装好的location*/
  import {setStore, getStore} from "../../config/utils";

  export default {
    name: "Search",
    components: {
      SearchHistory,
      headTop,
    },
    data() {
      return {
        search_history: '', //搜索历史
        search_List: [], //搜索列表
        search_history_list: JSON.parse(getStore('restaurant_history')), // 历史搜索记录
        Search_null: false, // 列表的数据是否为空
        img_base: 'https://elm.cangdu.org/img/' //图片的api
      }
    },
    methods: {
      /*搜索*/
      async restaurant(history) {
        this.Search_null = false;
        let {search_history_list} = this;
        this.search_history = history;
        //判断输入的是否为空
        if (!history) {
          return
        }
        //1.发送请求获取数据
        let res = await searchRestaurant(this.$route.query.geohash, this.search_history) //发送请求
        // console.log(res)
        /*判断是否有数据*/
        if ((res.data || {}).length === 0 || res.data.type === "ERROR_DATA") {
          this.Search_null = true;
          return
        }
        //2.将获取的数据保存到search_List
        this.search_List = res.data;
        console.log(this.search_List);
        // 3.将搜索的关键词保存到search_history_list
        if ((search_history_list || {}).length) {
          const result = search_history_list.filter(item => !(item === history));
          // console.log(result) //过滤成功
          result.unshift(history);
          this.search_history_list = result;
          // console.log(this.search_history_list)
          //对数据进行存储到location
          setStore('restaurant_history', this.search_history_list)
          // console.log(search_history_list)
        } else {
          search_history_list.unshift(history);
          //对数据进行存储到location
          setStore('restaurant_history', this.search_history_list)
          // console.log(search_history_list)
        }

      },
      /*删除历史记录单条数据*/
      deleteHistory(index) {
        this.search_history_list.splice(index, 1)
        setStore('restaurant_history', this.search_history_list)
      },
      /*删除所有的历史记录*/
      deleteAllHistory() {
        this.search_history_list = []
        setStore('restaurant_history', this.search_history_list)
      }
    },


  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  px2rem(designpx)
    $rem = 37.5px
    return (designpx / $rem) rem

  .search_form
    width 100%
    margin-top px2rem(44px)
    color #333
    background-color #fff
    padding px2rem(12px)

    .search_input
      width 72%
      background-color #f2f2f2
      height px2rem(35.16px)
      border-radius px2rem(5px)
      padding 0 px2rem(6px)
      font-size px2rem(16px)
      border px2rem(1px) solid #e4e4e4
      font-weight bold
      outline none

    .search_submit
      background-color #3190e8
      color #fff
      font-size px2rem(16px)
      margin-left px2rem(5px)
      border-radius px2rem(3px)
      padding px2rem(5px) px2rem(22px)

  .search_history
    text-indent px2rem(7px)
    font-size px2rem(14.1px)
    line-height px2rem(46px)
    height px2rem(46px)
    font-weight bolder
    color #666

  .history_list
    background-color #fff
    border-bottom px2rem(1.5px) solid #e4e4e4
    display flex
    justify-content space-between
    align-items center
    height px2rem(46px)
    padding 0 px2rem(10px)

    .history_text
      font-size px2rem(18px)
      font-weight bolder
      width 80%
      height 100%
      line-height px2rem(47.5px)

    .delete_icon
      width px2rem(23.5px)
      height px2rem(23.5px)

  .clear_all_history
    width 100%
    height px2rem(46px)
    font-size px2rem(16.4px)
    text-align center
    line-height px2rem(46px)
    color #3190e8
    font-weight bolder
    background-color #fff

  .list_container
    width 100%
    background-color #fff
    margin-bottom px2rem(40px)

    .list_li
      padding px2rem(13px) px2rem(10px)
      display flex
      flex-direction row
      width 100%
      border-bottom px2rem(1px) solid #e4e4e4
      .restaurant_img
        width px2rem(39.9px)
        height px2rem(39.9px)
      .item_right
        width 80%
        margin-left px2rem(10px)
        padding-bottom px2rem(10px)
        border-bottom px2rem(1px) solid #e4e4e4
        .item_right_text

          p,span
            margin-right px2rem(5px)
            color #333
            font-weight bolder
            line-height px2rem(21px)
            font-size px2rem(14px)
</style>
