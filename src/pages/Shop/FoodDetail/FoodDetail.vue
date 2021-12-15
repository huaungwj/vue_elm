<template>
  <div class="foodDetail">
    <head-top>
      <i @click="$router.back()" class="iconfont icon-xiazai6" slot="left"></i>
      <span class="foodname" slot="center">{{ (foodDetail || "").name }}</span>
    </head-top>
    <section class="foodImg">
      <img :src="`${img_base}${foodDetail.image_path}`" alt="" />
    </section>
    <p class="description-text">{{ foodDetail.description }}</p>
    <section class="food_detail_description">
      <h4>{{ (foodDetail || "").name }}</h4>
      <div class="rating_sale">
        <span>评分</span>
        <Star />
        <span style="color: #f60">{{ foodDetail.rating }}</span>
      </div>
      <p>
        <span style="color: #f60"> &nbsp;售价 ￥20 起</span>
      </p>
      <p>
        <span>{{ foodDetail.tips }} &nbsp;&nbsp;&nbsp;</span>
        <span>好评率 8% </span>
      </p>
    </section>
  </div>
</template>

<script>
// 引入相关的组件
import headTop from "../../../components/headTop/headTop";
import Star from "../../../components/Star/Star";
// vuex
import { mapState } from "vuex";
export default {
  name: "FoodDetail",

  components: {
    headTop,
    Star,
  },
  data() {
    return {
      img_base: "https://elm.cangdu.org/img/", // 页面图片的url地址
    };
  },
  mounted() {
    // console.log(JSON.parse(this.$route.query.food)); // 数据是一个对象
    this.$store.dispatch("saveFoodDetail", {
      food: JSON.parse(this.$route.query.food),
    });
    // 第一次进来的时候保存
  },
  computed: {
    ...mapState(["foodDetail"]),
  },
  methods: {},
  watch: {
    // 监听路由的变化
    $route: {
      deep: true, // 开启深度监视
      // 如果值发生变化，该方法会被调用
      handler(value) {
        // 如果有这个属性则执行
        if (value.query.food) {
          this.$store.dispatch("saveFoodDetail", {
            food: JSON.parse(value.query.food),
          });
        }
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
px2rem(designpx) {
  $rem = 37.5px;
  return (designpx / $rem) rem;
}

// 整个盒子部分
.foodDetail {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 12;
  padding-top: px2rem(44px);
  font-size: px2rem(14px);
  color: #666;

  /* 中间食物图片部分 */
  .foodImg {
    img {
      width: 100%;
      height: px2rem(375px);
    }
  }

  // 图片下面的描述部分
  .description-text {
    font-family: 'Helvetica Neue,Tahoma,Arial';
    margin-top: px2rem(12px);
    padding-left: px2rem(12px);
  }

  // 商家具体的描述信息
  .food_detail_description {
    padding: px2rem(9.7px);

    h4 {
      font-size: px2rem(16.5px);
      margin-bottom: px2rem(10px);
      color: #333;
    }

    .rating_sale {
      display: flex;
      align-items: flex-end;
      margin-bottom: px2rem(10px);

      span {
        padding: 0 px2rem(3px);
      }
    }

    p {
      margin-bottom: px2rem(10px);
    }
  }
}

// 头部小图标
.icon-xiazai6 {
  color: #ffffff;
  font-size: px2rem(16px);
}
</style>


