<template>
  <div>
    <!--头部公共组件-->
    <head-top>
      <router-link slot="left" :to="{path: '/mSite',query: {'geohash':$store.state.geohash}}">
        <i class="iconfont icon-jiantou2 i-left" style="color: #fff;"></i>
      </router-link>
      <span class="title_text" slot="center">{{headTitle}}</span>
    </head-top>
    <!--nav分类导航-->
    <section class="sort_container">
      <!--一级导航-->
      <!--第一个分类-->
      <div class="sort_item" :class="{choose_type: sortBy==='food'}">
        <div class="sort_item_container" @click="chooseType('food')" style="background-color: #fff;">
          <div class="sort_item_border">
            <span class="sort_title category_title">{{foodTitle}}</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"></polygon>
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section v-show="sortBy === 'food'" class="food_sort_container sort_detail_type">
            <ul class="food_sort_left_ul">
              <li class="food_sort_item" :class="{'category_active': restaurant_category_id === item.id}"
                  v-for="(item,index) in category" :key="item + index" @click="selectCategoryName(item.id,index)">
                <div class="left" style="height: 100%;display: flex;align-items: center">
                  <img :src="getImgPath(`${item.image_url}`)"
                       class="category_icon">
                  <span>{{item.name}}</span>
                </div>
                <div class="right" style="display: flex;align-items: center">
                  <span class="category_count">{{item.count}}</span>
                  <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow">
                    <path d="M0 0 L6 4 L0 8" stroke="#bbb" stroke-width="1" fill="none"></path>
                  </svg>
                </div>
              </li>
            </ul>
            <ul class="food_sort_right_ul">
              <li class="food_details_item" v-for="(detailDate,index) in categoryDetail" @click="getCategoryIds(detailDate.id,detailDate.name)" :key="detailDate + index">
                <span class="food_menu" :style="{color: restaurant_category_ids==detailDate.id ? '#3190e8': '#666'}">{{detailDate.name}}</span>
                <span class="food_price">{{detailDate.count}}</span>
              </li>

            </ul>

          </section>
        </transition>
      </div>
      <!--顺序-->
      <div class="sort_item" :class="{choose_type: sortBy==='sort'}">
        <div class="sort_item_container" @click="chooseType('sort')" style="background-color: #fff">
          <div class="sort_item_border">
            <span class="sort_title category_title">排序</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"></polygon>
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section v-show="sortBy === 'sort'" class="sort_detail_type" style="">
            <ul class="sort_list_container" @click="sortList($event)">
              <li class="sort_list_li">
                <svg viewBox="0 0 33 32" id="default">
                  <path fill="#3b87c8"
                        d="M13.374 29.064a.94.94 0 0 1-.941-.941V6.476l-7.285 6.899a.942.942 0 0 1-1.299-1.364l8.876-8.424a.94.94 0 0 1 1.59.681v23.855a.94.94 0 0 1-.941.941zM20.904 29.355h-.008a.94.94 0 0 1-.375-.078.943.943 0 0 1-.559-.86V3.944a.94.94 0 1 1 1.882 0v22.287l7.238-6.842a.94.94 0 0 1 1.289 1.366l-8.818 8.338a.943.943 0 0 1-.649.264z"></path>
                </svg>
                <p data="0" :class="{'sort_select': sortByType === 0}">
                  <span>智能排序</span>
                  <svg v-show="sortByType === 0" viewBox="0 0 38 32" id="selected">
                    <path fill="#3190e8"
                          d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg viewBox="0 0 32 32" id="distance">
                  <path fill="#2a9bd3"
                        d="M15.884 31.236l-.042.001a.888.888 0 0 1-.59-.224l-7.91-7.91a7.548 7.548 0 0 1-.498-.471 12.752 12.752 0 0 1-3.747-9.045C3.097 6.523 8.824.796 15.888.796s12.791 5.727 12.791 12.791c0 3.532-1.432 6.73-3.747 9.045-.196.196-.409.391-.613.578l-7.813 7.804a.886.886 0 0 1-.589.223l-.035-.001zm0-28.667C9.818 2.59 4.908 7.513 4.908 13.582c0 3.023 1.218 5.762 3.19 7.752l.461.435 7.316 7.316 7.2-7.2q.284-.249.551-.516a10.977 10.977 0 0 0 3.225-7.787c0-6.066-4.905-10.987-10.965-11.013z"></path>
                  <path fill="#2a9bd3"
                        d="M15.884 18.524a5.707 5.707 0 0 1-4.07-1.732l-.001-.001a5.76 5.76 0 1 1 4.119 1.734h-.05zm-2.817-2.942a3.982 3.982 0 1 0 0-5.626c-.726.717-1.175 1.713-1.175 2.813s.449 2.096 1.175 2.813z"></path>
                </svg>
                <p data="5" :class="{'sort_select': sortByType===5}">
                  <span>距离最近</span>
                  <svg v-show="sortByType===5" viewBox="0 0 38 32" id="selected">
                    <path fill="#3190e8"
                          d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path>
                  </svg>
                </p>

              </li>
              <li class="sort_list_li">
                <svg viewBox="0 0 23 32" id="hot">
                  <path fill="#f07373"
                        d="M9.859 29.375c-3.489-.771-6.362-3.097-7.187-5.551-.882-2.623-1.029-6.873-.238-9.318l-1.727.037.001.002.001.004.004.01.011.029.038.091c.039.09.086.191.142.3.155.304.349.627.586.955a7.477 7.477 0 0 0 2.711 2.318c.583.153.583.153 1.087-.188.187-.263.187-.263.224-.39.028-.094.041-.176.05-.28.01-.109.016-.238.022-.47.063-2.219.162-3.38.562-4.943a10.05 10.05 0 0 1 .814-2.185c1.433-2.723 4.843-6.053 6.699-7.021l-1.325-.962c-.064.382-.127.992-.131 1.722-.008 1.252.169 2.393.616 3.329.261.547.525.968 1.132 1.862l.23.339c.86 1.281 1.161 1.986 1.069 2.653l-.009.125c.069.517.069.517.781.906.451-.026.451-.026.578-.104.144-.093.144-.093.19-.136.041-.037.079-.077.123-.125.068-.076.153-.178.245-.295.22-.279.458-.615.677-.963.648-1.028 1.045-1.988 1.037-2.845l-.914.009-.706.581c.295.358.809 1.075 1.33 1.936.826 1.363 1.492 2.791 1.898 4.209 1.1 3.845.3 9.288-2.245 11.75a9.652 9.652 0 0 1-1.659 1.29 10.232 10.232 0 0 1-3.471 1.332c-.794.151-1.385.191-2.064.191h-.009a2.75 2.75 0 0 1-.373-.03 6.007 6.007 0 0 1-.585-.115 7.765 7.765 0 0 1-.536-.15l-.578 1.735a9.182 9.182 0 0 0 1.445.341c.221.031.43.048.627.048h.009a12.546 12.546 0 0 0 2.407-.224 12.011 12.011 0 0 0 4.088-1.572c.699-.431 1.358-.94 1.971-1.533 3.098-2.998 4-9.132 2.731-13.567-.455-1.591-1.188-3.161-2.092-4.653-.569-.939-1.134-1.727-1.482-2.15l-1.645-1.998.024 2.588c.004.412-.281 1.1-.756 1.853a9.64 9.64 0 0 1-.569.809 4.528 4.528 0 0 1-.158.195c.028-.027.028-.027.16-.113.122-.075.122-.075.57-.101.71.388.71.388.778.902h-.914l.906.125c.174-1.262-.261-2.281-1.362-3.922l-.235-.347c-.554-.817-.787-1.189-.995-1.624-.306-.642-.444-1.53-.438-2.53a10.566 10.566 0 0 1 .107-1.431L14.44.304l-1.628.85c-2.18 1.138-5.862 4.733-7.471 7.791a11.873 11.873 0 0 0-.967 2.583 19.2 19.2 0 0 0-.511 3.147c-.036.423-.061.839-.079 1.273-.011.281-.019.531-.029.924-.005.191-.01.298-.015.354a.403.403 0 0 1 .019-.077c.027-.099.027-.099.203-.346.492-.332.492-.332 1.112-.157a5.745 5.745 0 0 1-2.54-2.496 3.456 3.456 0 0 1-.093-.197l-.018-.044-.002-.006v.001l.001.002v.002l-.915-2.473-.812 2.51c-.917 2.836-.757 7.485.245 10.463 1.042 3.099 4.442 5.852 8.526 6.754l.395-1.785z"></path>
                </svg>
                <p data="6" :class="{'sort_select': sortByType===6}">
                  <span>销量最高</span>
                  <svg v-show="sortByType===6" viewBox="0 0 38 32" id="selected">
                    <path fill="#3190e8"
                          d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path>
                  </svg>
                </p>

              </li>
              <li class="sort_list_li">
                <svg viewBox="0 0 32 32" id="price">
                  <path fill="#e6b61a"
                        d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path>
                  <path fill="#e6b61a"
                        d="M23.14 6.06l-5.12 8.65h4.48v1.54h-5.49v2.43h5.49v1.54h-5.49v5.1h-2.02v-5.1H9.53v-1.54h5.46v-2.43H9.53v-1.54h4.45L8.8 6.06h2.24l4.99 8.48 4.93-8.48h2.18z"></path>
                </svg>
                <p data="1" :class="{'sort_select': sortByType===1}">
                  <span>起送价最低</span>
                  <svg v-show="sortByType===1" viewBox="0 0 38 32" id="selected">
                    <path fill="#3190e8"
                          d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg viewBox="0 0 32 32" id="speed">
                  <path fill="#37c7b7"
                        d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path>
                  <path fill="#37c7b7" d="M15 7v11.002l5.678 4.882 1.304-1.517-5.33-4.583.348.758V6.999h-2z"></path>
                </svg>
                <p data="2" :class="{'sort_select': sortByType===2}">
                  <span>配送速度最快</span>
                  <svg v-show="sortByType===2" viewBox="0 0 38 32" id="selected">
                    <path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>
                </p>

              </li>
              <li class="sort_list_li">
                <svg viewBox="0 0 33 32" id="rating">
                  <path fill="#eba53b"
                        d="M27.087 31.84L16.8 25.553 6.504 31.84l2.824-11.727-9.186-7.878 12.019-.941L16.801.16l4.631 11.134 12.019.941-9.158 7.849zM16.8 23.369l7.407 4.527-2.014-8.471 6.588-5.647-8.659-.696L16.8 5.063l-3.341 8.019-8.659.696 6.588 5.647-2.014 8.471z"></path>
                </svg>
                <p data="3" :class="{'sort_select': sortByType===3}">
                  <span>评分最高</span>
                  <svg v-show="sortByType===3" viewBox="0 0 38 32" id="selected">
                    <path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>
                </p>

              </li>
            </ul>
          </section>
        </transition>
      </div>
      <!--筛选-->
      <div class="sort_item" :class="{choose_type: sortBy==='activity'}">
        <!--筛选一级菜单-->
        <div class="sort_item_container" @click="chooseType('activity')" style="background-color: #fff">
          <div class="sort_item_border">
            <span class="sort_title category_title">筛选</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"></polygon>
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section v-show="sortBy === 'activity'" class="sort_detail_type filter_container">
            <!--配送方式-->
            <section style="width: 100%;">
              <!--title-->
              <header class="filter_header_style">配送方式</header>
              <!--ul-->
              <ul class="filter_ul">
                <!--每个送餐的-->
                <li class="filter_li" v-for="(delivery,index) in delivery" :key="delivery + index"
                    @click="selectDeliveryMode(delivery.id)">
                  <!--svg-->
                  <svg v-show="delivery_mode === delivery.id" viewBox="0 0 38 32" id="selected">
                    <path fill="#3190e8"
                          d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path>
                  </svg>
                  <svg v-show="delivery_mode != delivery.id" viewBox="0 0 32 32" id="fengniao">
                    <path fill="#27a9e1"
                          d="M5.953 2.793s-.117 1.801.857 3.56c.361.255 10.458 6.218 10.458 6.218L5.953 2.794z"></path>
                    <path fill="#b8e5fa"
                          d="M9.604.889s-.333 1.404.069 3.147c.254.307 7.801 8.116 7.801 8.116L9.604.889z"></path>
                    <path fill="#0089cf"
                          d="M29.282 14.601l-4.861-.361s-.133-.001-.147-.226h-.002a2.652 2.652 0 0 0-2.978-2.357h-.003l-.011.001-.12.019-.004.001c-.432.075-1.812.374-3.038 1.285 0 0-.167.121-.421.33L2.665 6.043s3.254 8.665 12.207 11.98c-1.6 2.849-7.407 13.48-7.407 13.48l2.446-1.306s.775-2.853 1.884-4.957c.609-.936 1.211-.992 1.498-1.141.291-.151 3.707-.765 6.431-4.339.897-1.166 1.244-2.666 1.723-4.261.28-.061 3.008-.651 3.789-.718 1.068-.092 4.045-.181 4.045-.181z"></path>
                    <path fill="#0089cf"
                          d="M7.392 17.849c-1.567-1.368-2.199-3.219-2.035-5.217-.232-.288-.45-.572-.654-.851-.484 2.903.555 4.854 2.176 6.269 1.538 1.342 3.635 1.85 5.466 1.577-1.674.109-3.563-.565-4.953-1.778z"></path>
                    <path fill="#0089cf"
                          d="M12.345 19.628h.002zm-7.642-7.846c.204.279.421.563.654.851-.164 1.998.468 3.849 2.035 5.217 1.292 1.128 3.016 1.79 4.597 1.79.12 0 .238-.004.356-.011a6.554 6.554 0 0 1-.975.071c-1.568 0-3.22-.54-4.49-1.648-1.621-1.415-2.66-3.366-2.176-6.269z"></path>
                  </svg>
                  <!--text-->
                  <span :class="{'selected_filter': delivery_mode===delivery.id}">{{delivery.text}}</span></li>
              </ul>
            </section>
            <section style="width: 100%;">
              <header class="filter_header_style">商家属性（可以多选）</header>
              <ul class="filter_ul" style="padding-bottom: 0.2rem;">
                <li class="filter_li" v-for="(activity , index ) in activity" :key="activity + index"
                    @click='selectSupportIds(index,activity.id)'>
                  <!--                <svg viewBox="0 0 38 32" id="selected"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>-->
                  <span v-show="!support_ids[index].status" class="filter_icon"
                        :style="{'color': `#${activity.icon_color}`,'border-color': `#${activity.icon_color}`}">{{activity.icon_name}}</span>
                  <svg v-show="support_ids[index].status" viewBox="0 0 38 32" id="selected">
                    <path fill="#3190e8"
                          d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path>
                  </svg>
                  <span :class="{'selected_filter': support_ids[index].status}">{{activity.name}}</span></li>

              </ul>
            </section>
            <footer class="confirm_filter">
              <div class="clear_all filter_button_style" @click="clearSelect">清空</div>
              <div class="confirm_select filter_button_style" @click="confirmSelectFun">确定
                <span v-show="filterNum>0">({{filterNum}})</span>
              </div>
            </footer>
          </section>
        </transition>
      </div>
    </section>
    <!--商家列表部分-->
    <div>
      <shop-list :geohash="geohash" :restaurantCategoryId="restaurant_category_id" :restaurantCategoryIds="restaurant_category_ids" :sortByType='sortByType' :deliveryMode="delivery_mode" :confirmSelect="confirmStatus" :supportIds="support_ids" v-if="latitude"></shop-list>
    </div>
  </div>
</template>

<script>
  /*引入页面需要用到的公共组件*/
  import headTop from "../../components/headTop/headTop";
  import ShopList from "../../components/ShopList/ShopList";
  /*封装的请求api*/
  import {shopCategory, foodDelivery, foodActivity} from "../../service/getData";
  /*引入处理图片的文件*/
  import {getImgPath} from "../../service/mixin";
  //使用vuex辅助函数
  import {mapState} from "vuex"



  export default {
    name: "Food",
    components: {
      headTop,
      ShopList,
    },
    computed:{
      ...mapState(["latitude","longitude"]),
    },
    data() {
      return {
        geohash: '', //mSite页面传过来的经纬度
        sortBy: '', // 保存分类的名字 值为可以为food,sort,activity
        foodTitle: '', //当前分类导航显示的title
        headTitle: '', //head-top这个组件显示的 msite页面传过来的
        restaurant_category_ids: '', // 帅选类型的id值
        restaurant_category_id: '', // 食品类型id值 ，由mSite组件传过来， 页面的分类第一页面就是根据他来显示
        category: null, //分类 category 左侧分类的数据
        categoryDetail: null, //分类category 右边的详细数据
        delivery: null, // 配送方式的数据
        activity: null, //商家属性活动列表
        delivery_mode: null, // 选中的配送方式
        support_ids: [], // 选中的商铺活动列表
        filterNum: 0, // 所选中的所有样式的集合
        sortByType: null, // 根据何种方式排序
        confirmStatus: false // 确认选择

      }
    },
    created() {
      this.initData()
    },
    mixins: [getImgPath],
    methods: {
      /*初始化数据*/
      async initData() {
        this.geohash = this.$route.query.geohash; // 从路由的query请求中获取传过来的数据
        this.headTitle = this.$route.query.title; // 获取传过来的title
        this.foodTitle = this.headTitle; // 将排序的title与this.headTitle同步
        this.restaurant_category_id = this.$route.query.restaurant_category_id
        console.log(this.restaurant_category_id) //成功获取到了数据
        let res = await shopCategory(); // 获取分类列 表的数据
        // console.log(res); // 成功返回8组数据
        this.category = res.data; // console.log(this.category); // 成功
        /*初始化的时候category左侧默认应该默认选择对应点击的分类，并在category右侧的栏显示数据*/
        this.category.forEach(item => {
          if (this.restaurant_category_id == item.id) {
            this.categoryDetail = item.sub_categories
            this.restaurant_category_id = item.id //更新默认选中状态
          }
        });
        // 获取配送方式的数据
        let delivery;
        let activity;
        delivery = await foodDelivery(this.$store.state.latitude, this.$store.state.longitude); //成功 返回一组数组
        this.delivery = delivery.data
        //获取商家属性活动数据
        activity = await foodActivity(this.$store.state.latitude, this.$store.state.longitude); // 成功 返回6组数据
        this.activity = activity.data
        /*记录support_ids的状态，默认不选中，点击状态取反，status为true时为选中状态*/
        this.activity.forEach((item, index) => {
          this.support_ids[index] = {status: false, id: item.id};
        })
      },
      async chooseType(type) {
        /*判断是否第一次点击，如果不相等那就把值给sortBy*/
        if (this.sortBy !== type) {
          this.sortBy = type
          /*判断当前点击的是否是food这个标题，是则更换标题*/
        } else {
          /*进来了说明是第二次点击*/
          this.sortBy = '';
        }
      },

      /*选中category左侧的列表时，右侧渲染出相应的数据*/
      selectCategoryName(id, index) {
        /*第一个选项--全部商家，因为没有相应的数据，所以默认渲染所有的数据*/
        if (index === 0) {
          this.restaurant_category_ids = null;
          this.sortBy = '' // 如果点击的是第一个则直接发送请求获取全部的数据
          //如果不是第一个选项时，右侧展示其子级sub_categories的列表
        } else {
          this.restaurant_category_id = id;
          //categoryDetail是分类的右边的数据
          this.categoryDetail = this.category[index].sub_categories
        }
      },
      //选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
      getCategoryIds(id, name) {
        console.log(id, name)
        this.restaurant_category_ids = id;
        this.sortBy = "";
        this.foodTitle = this.headTitle = name;
      },
      /*排序*/
      sortList(event) {
        let node;
        // 如果点击的是 span 中的文字，则需要获取到 span 的父标签 p
        if (event.target.nodeName.toUpperCase() !== "P") {
          node = event.target.parentNode;
        } else {
          node = event.target;
        }
        this.sortByType = node.getAttribute("data");
        this.sortByType = this.sortByType * 1 //转换为number类型
        console.log(this.sortByType);
        this.sortBy = "";
      },
      /*筛选配送方式*/
      selectDeliveryMode(id) {
        /*当delivery_mode为null的时候，说明是第一次选中，把id的值赋值给delivery_mode，并且将filterNum+1*/
        if (this.delivery_mode === null) {
          /*计数选中+1*/
          this.filterNum++;
          this.delivery_mode = id
          // 如果delivery_mode的值跟传过来的值相等的时候，说明是取消选择，delivery_mode =null ，filterNum--
        } else if (this.delivery_mode === id) {
          this.filterNum--;
          this.delivery_mode = null;
          //如果都不相等的话，说明他有其他的错误值，则纠正，把当前的id赋值
        } else {
          this.delivery_mode = id
        }
      },
      /*筛选商家属性活动*/
      selectSupportIds(index, id) {
        /*点击调用修改数组中的内容*/
        this.support_ids.splice(index, 1, {
          status: !this.support_ids[index].status,
          id,
        });
        /*重新计算filterNum的值*/
        this.filterNum = this.delivery_mode == null ? 0 : 1;
        this.support_ids.forEach(item => {
          if (item.status) {
            this.filterNum++;
          }
        })
      },
      /*清空所有选中的商家属性*/
      clearSelect() {
        /*清空*/
        this.support_ids.map(item => {
          item.status = false
        });
        this.delivery_mode = null;
        this.filterNum = 0;
      },
      /*确定 传给子组件进行筛选*/
      confirmSelectFun() {
        //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
        this.confirmStatus = !this.confirmStatus;
        this.sortBy = "";
      }

    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  px2rem(designpx)
    $rem = 37.5px
    return (designpx / $rem) rem

  .i-left
    font-size px2rem(20px)
    font-weight bold

  .title_text
    font-size px2rem(18.75px)
    font-weight bold

  /*分类导航*/
  .sort_container
    padding-top px2rem(44px)
    width 100%
    display flex
    position fixed
    z-index: 10
    /*三个导航下拉*/

    .sort_item
      width 33.3%
      height px2rem(45.5px)
      background-color #fff

      .sort_item_container
        height px2rem(26.5px)
        padding-top px2rem(10px)
        position relative
        z-index 100

        .sort_item_border
          display flex
          -moz-box-sizing border-box
          -webkit-box-sizing: border-box
          -o-box-sizing border-box
          -ms-box-sizing border-box
          height px2rem(24px)
          justify-content center
          align-items center
          border-right px2rem(1px) solid #e4e4e4
          /*导航的title*/

          .sort_title
            font-size px2rem(13px)
            font-weight bolder
            line-height px2rem(24px)
            padding-right px2rem(3px)

  /*二级菜单*/
  .food_sort_container
    display flex
    /*最外层ul左边*/

    .food_sort_left_ul
      flex 1
      width 50%
      background-color #f1f1f1
      overflow-y auto
      height px2rem(375px)
      /*分类里面的每一个li*/

      .food_sort_item
        padding 0 px2rem(11.7px)
        height px2rem(42px)
        overflow hidden
        display flex
        justify-content space-between
        border-bottom px2rem(1px) solid #e4e4e4
        /*分类的食物图标*/

        .category_icon
          width px2rem(18px)
          height px2rem(18px)
          vertical-align middle
          margin-right px2rem(12px)

        /*每一个分类的名字*/

        span
          font-size px2rem(13px)
          color #666
          line-height px2rem(42px)
          font-weight bold

        /*每个菜单li右边的计数器*/

        .category_count
          background-color #ccc
          font-size px2rem(12px)
          border-radius px2rem(7px)
          padding 0 px2rem(4px)
          margin-right px2rem(8px)
          color #fff
          vertical-align middle
          height px2rem(18px)
          line-height px2rem(18px)

    .food_sort_right_ul
      width 50%
      flex 1
      background-color #fff
      height px2rem(375px)
      padding 0 px2rem(12px)
      overflow-y auto

      .food_details_item
        display flex
        height px2rem(42px)
        border-bottom px2rem(0.1px) solid #e4e4e4
        justify-content space-between
        align-items center
        font-family "Microsoft Yahei"
        color #666

        span
          font-size px2rem(13px)

  /*顺序的下拉菜单*/
  /*section*/
  .sort_detail_type
    width 100%
    position absolute
    border-top px2rem(1px) solid #e4e4e4
    background-color #fff
    left 0
    top px2rem(88px)
    /*ul*/

    .sort_list_container
      width 100%
      display flex
      flex-direction column
      /*li*/

      .sort_list_li
        width 100%
        height px2rem(58px)
        display flex
        align-items center
        /*小图标svg*/

        svg
          width px2rem(16.41px)
          height px2rem(16.41px)
          margin 0 px2rem(7.2px) 0 px2rem(18.5px)

        /*text内容*/

        p
          flex auto
          line-height px2rem(58px)
          border-bottom px2rem(1px) solid #e4e4e4
          align-items center
          font-size px2rem(13px)
          color #666

  /*筛选 配送方式 最后一个*/
  .filter_container
    display flex
    flex-direction column
    /*title (配送方式) header*/

    .filter_header_style
      font px2rem(12px) "Microsoft Yahei"
      height px2rem(35px)
      line-height px2rem(35px)
      background-color #fff
      color #333
      padding-left px2rem(12px)

  /*ul 中间的内容部分*/
  .filter_ul
    display flex
    padding 0 px2rem(12px)
    flex-wrap wrap

    /*每一个li */

    .filter_li
      width px2rem(96px)
      display flex
      height px2rem(32px)
      align-items center
      border px2rem(1px) solid #eee
      padding 0 px2rem(6px)
      border-radius px2rem(5px)
      margin 0 px2rem(6px) px2rem(6px) 0
      /*保障图标样式*/

      .filter_icon
        border-radius px2rem(3px)
        border px2rem(1px) solid #e4e4e4
        padding px2rem(2px)
        text-align center
        margin-right px2rem(6px)

      svg
        width px2rem(19px)
        height px2rem(19px)
        margin-right px2rem(3px)

      span
        font-size px2rem(13px)
        color #333


  /*脚部两个按钮*/
  .confirm_filter
    background-color #f1f1f1
    display flex
    padding px2rem(7px) px2rem(5px)

    .filter_button_style
      width 50%
      height px2rem(43px)
      line-height px2rem(43px)
      text-align center
      font-size px2rem(19px)
      border-radius px2rem(7px)

    .clear_all
      background-color #fff
      border px2rem(1px) solid #fff
      margin-right px2rem(10px)

    .confirm_select
      background-color #56d176
      color #fff
      border px2rem(1px) solid #56d176


  /*商家shop*/
  .shop_list_container
    padding-top px2rem(81.5px)

  /*当前分类栏被选中的样式和动画过渡*/

  .choose_type {
    .sort_item_container {
      .category_title {
        color: #3190e8;
      }

      .sort_icon {
        transform: rotate(180deg);
        fill: #3190e8;
      }
    }
  }

  .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }

  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }

  /*category 菜单左边 active样式*/
  .category_active
    background-color #fff

  /*配送方式选中状态的样式*/
  .selected_filter
    color #3190e8 !important

  /*排序所有p标签*/
  .sort_select
    display flex
    justify-content space-between
    span
      color #3190e8


</style>
