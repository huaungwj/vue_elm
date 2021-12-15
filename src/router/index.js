import Vue from 'vue';
import VueRouter from 'vue-router';
import MSite from '../pages/MSite/MSite.vue';
import Order from '../pages/Order/Order.vue';
import Search from '../pages/Search/Search.vue';
import Profile from '../pages/Profile/Profile.vue';
import Home from '../pages/Home/Home.vue';
import App from '../App';
import SelectCity from '../pages/SelectCity/SelectCity';
import Food from '../pages/Food/Food';
import Loading from '../components/loading/Loading';
import Shop from '../pages/Shop/Shop';
import ShopMenu from '../pages/Shop/ShopMenu/ShopMenu';
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings';
import FoodDetail from '../pages/Shop/FoodDetail/FoodDetail';
import ShopDetail from '../pages/Shop/ShopDetail/ShopDetail';
import ShopSafe from '../pages/Shop/ShopDetail/ShopSafe/ShopSafe';
// import Login from '../pages/Login/Login';

const routes = [
  {
    //一级路由 index.html
    path: '/',
    component: App,
    children: [
      //耳机路由 app.vue
      /*主页路由*/
      {
        path: '/mSite',
        name: 'mSite',
        component: MSite,
      },
      /*搜索路由*/
      {
        path: '/search',
        component: Search,
      },
      /*订单路由*/
      {
        path: '/order',
        component: Order,
      },
      /*个人主页路由*/
      {
        path: '/profile',
        component: Profile,
      },
      /*选择城市列表首页*/
      {
        path: '/home',
        component: Home,
      },
      /*选中的城市详细地址*/
      {
        path: '/city/:id', //传值后面必须要加一个/
        component: SelectCity,
      },
      /*食品分类*/
      {
        path: '/food',
        component: Food,
      },
      //loading层
      {
        path: '/loading',
        component: Loading,
      },
      //shop商家详细菜单
      {
        path: 'shop',
        component: Shop,
        redirect: '/shop/shopmenu',
        children: [
          {
            path: 'shopmenu',
            component: ShopMenu,
            children: [
              {
                path: 'foodDetail',
                component: FoodDetail,
              },
            ],
          },
          {
            path: 'shopratings',
            component: ShopRatings,
          },
          // 商家详细页面
          {
            path: 'shopDetail',
            component: ShopDetail,
            // 三级路由
            children: [
              {
                path: 'shopSafe',
                component: ShopSafe,
              },
            ],
          },
        ],
      },
      /*如果当前的路径为 /  则自动跳转到home*/
      {
        path: '/',
        redirect: '/home',
      },
    ],
  },
];

Vue.use(VueRouter);

const router = new VueRouter({
  history: 'hash',
  routes,
});

export default router;
