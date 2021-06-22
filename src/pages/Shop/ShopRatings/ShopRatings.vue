<template>
  <!--评价部分-->
  <section
    class="eval_container"
    ref="ratings"
    data-mu-loading-color="secondary"
    data-mu-loading-overlay-color="rgba(0, 0, 0, 0)"
    v-loading="loading"
  >
    <section>
      <!--头部平均评分部分-->
      <header class="rating_header">
        <section class="rating_header_left">
          <span class="rating_score"
            >{{ parseInt(ratingScoreInfo.food_score) }}.{{ pointNum(ratingScoreInfo.overall_score) }}</span
          >
          <p>综合评价</p>
          <span class="rating_description">高于周边商家76.9%</span>
        </section>
        <section class="rating_header_right">
          <p>
            <span>服务态度</span>
            <Star />
            <span class="detail_score"
              >{{ parseInt(ratingScoreInfo.food_score) }}.{{ pointNum(ratingScoreInfo.service_score) }}</span
            >
          </p>
          <p>
            <span>菜品评价</span>
            <Star />
             <span class="detail_score"
              >{{ parseInt(ratingScoreInfo.food_score) }}.{{ pointNum(ratingScoreInfo.food_score) }}</span
            >
          </p>
          <p>
            <span>送达时间</span>
            <span style="font-size: 12px" class="delivery_time"
              >{{ ratingScoreInfo.deliver_time }}分钟</span
            >
          </p>
        </section>
      </header>
      <!--评论标签-->
      <ul class="tag_list_ul">
        <li
          @click="activeRatingMenu(index)"
          :class="{
            tagActivity: ratngMenuIndex === index,
            unsatisfied: item.unsatisfied,
          }"
          v-for="(item, index) in ratingMenuInfo"
          :key="index"
        >
          {{ item.name }}({{ item.count }})
        </li>
      </ul>
      <!--评论内容-->
      <ul class="rating_main_content">
        <li
          v-for="(rat, index) in shopRating"
          class="rating_content_item"
          style="width: 100%"
          :key="index"
        >
          <img :src="getImgPath(rat.avatar)" class="user_avatar" alt="" />
          <section class="rating_list_details" style="width: 100%">
            <header>
              <section class="username_star">
                <p class="username">{{ rat.username }}</p>
                <p class="star_desc">
                  <star />
                  <span class="time_spent_desc">{{ rat.time_spent_desc }}</span>
                </p>
              </section>
              <time class="rated_at"> {{ rat.rated_at }}</time>
            </header>
            <ul class="food_img_ul">
              <li v-for="(item, index) in rat.item_ratings" :key="index">
                <img
                  v-if="item.image_hash !== ''"
                  :src="getImgPath(item.image_hash)"
                  alt=""
                />
              </li>
            </ul>
            <ul class="food_name_ul">
              <li
                class="ellipsis"
                v-for="(item, index) in rat.item_ratings"
                :key="index"
              >
                {{ (item || {}).food_name }}
              </li>
            </ul>
          </section>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
/*引入相关的组件*/
import Star from "../../../components/Star/Star";
import BetterScroll from "better-scroll";
/* 引入封装的axios */
import { getShowRating,getRatingMenu,getRatingScore } from "../../../service/getData";
/* 引入处理图片路径的工具 */
import { getImgPath } from "../../../config/mixin";
/*引入loading*/
import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
import Vue from "vue";
import Loading from "muse-ui-loading";
Vue.use(Loading);

export default {
  name: "ShopRatings",
  components: {
    Star,
  },
  mixins: [getImgPath],
  data() {
    return {
      geohash: "", // 经纬度信息
      shopId: "", //商家id
      shopRating: [], // 商家评论信息
      loading: false, // loading
      ratingMenuInfo: [], // 评论分类信息
      ratngMenuIndex: 0, // 当前点击选中的ratingMenuInfo
      ratingScoreInfo: '', // 商铺评分信息
    };
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    this.loading = true; // 初始化加载数据开启loading层
  },
  methods: {
    /* 初始化数据 */
    async _initData() {
      getShowRating(this.shopId).then((res) => {
        this.shopRating = res.data;
        // console.log(res.data); // 成功获取
        // 此时应该获取到数据了 关闭loading层
        if (this.shopRating.length > 0) {
          this.loading = false;
        }
        // 获取到数据实例化滚动条
        this.$nextTick(() => {
          this.ratingScroll = new BetterScroll(this.$refs.ratings, {
            movable: true,
            zoom: true,
            pullUpLoad: true,
          });
          /* 监听 */
          this.ratingScroll.on("scroll", (pos) => {
            if (Math.abs(Math.round(pos.y)) >=  Math.abs(Math.round(this.ratingScroll.maxScrollY))) {
              this.loading = true;
              this.slideUpData();
              this.ratingScroll.refresh(); // 重新计算
            }
          });
        });
      });
      // 获取评论的分类总览
      getRatingMenu(this.shopId).then(
        (res) => {
          // console.log(res.data); // 成功返回数据
          this.ratingMenuInfo = res.data 
        });
      getRatingScore(this.shopId).then((res)=> {
        // console.log(res.data); // 成功 对象
        this.ratingScoreInfo = res.data;
      })
    },
    // 评论总览点击判断是否选中
    activeRatingMenu(index) {
      this.ratngMenuIndex = index
    },
    // 取出小数点后一位
    pointNum(num){
      const score = num + ''
      // console.log(score);
      const ipos = score.indexOf('.') // 分割部分
      // console.log(ipos);
      const newScore = score.substring(ipos+1,3)
      // console.log(newScore)
      return newScore
    },
    /* 评论下拉刷新 */
    async slideUpData() {
      getShowRating(this.shopId).then((res) => {
        // console.log(res.data);
        const result = res.data; // 数据
        result.forEach((item) => {
          this.shopRating.push(item);
        });
        this.loading = false;
        // console.log(this.shopRating);

      });
    },
  },
  mounted() {
    this._initData();
  },
  
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
px2rem(designpx) {
  $rem = 37.5px;
  return (designpx / $rem) rem;
}

/* 评价部分 */
.eval_container {
  height: 80vh;
  font-size: px2rem(12px);
  margin-top: px2rem(162px);
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;

  .rating_header {
    display: flex;
    padding: px2rem(19px) px2rem(12px);
    background-color: #fff;
    margin-bottom: px2rem(12px);
  }

  .rating_header_left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 3;

    .rating_score {
      color: #f60;
      font-size: px2rem(28px);
      margin-bottom: px2rem(10px);
    }

    p {
      color: #666;
      margin-bottom: px2rem(7px);
      font-size: px2rem(15.2px);
    }

    .rating_description {
      color: #999;
      margin-bottom: px2rem(3px);
    }
  }

  /* 综合评价右边部分 */
  .rating_header_right {
    display: flex;
    flex: 4;
    flex-direction: column;

    /* 下面的所有span */
    span {
      color: #666;
      margin: 0 px2rem(12px) px2rem(3px) 0;
      font: px2rem(16px) 'Helvetica Neue,Tahoma,Arial';
    }

    /* 所有p */
    p {
      display: flex;
      align-items: center;

      .detail_score {
        font-size: px2rem(13px);
        color: #f60;
        margin-left: px2rem(10px);
      }
    }
  }

  /* 评价总览部分 */
  .tag_list_ul {
    display: flex;
    border-bottom: px2rem(1px) solid #e4e4e4;
    flex-wrap: wrap;
    padding: px2rem(12px);
    background-color: #fff;

    li {
      background-color: #ebf5ff;
      color: #6d7885;
      border: px2rem(1px);
      font: px2rem(14px) 'Microsoft Yahei';
      border-radius: px2rem(5px);
      padding: px2rem(7px);
      margin: 0 px2rem(9.3px) px2rem(5px) 0;
      font-weight: lighter;
    }

    .unsatisfied {
      color: #aaa;
      background-color: #f5f5f5;
    }

    .tagActivity {
      color: #ffffff;
      background-color: #3190e8;
    }
  }
}

/* 评论详细部分 ul */
.rating_main_content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 px2rem(10px);
  background-color: #fff;

  /* li */
  .rating_content_item {
    padding: px2rem(14px) 0;
    display: flex;
    width: 100%;

    /* 头像部分 */
    .user_avatar {
      width: px2rem(35.16px);
      margin-right: px2rem(18.7px);
      height: px2rem(35.16px);
      border-radius: 50%;
    }

    /* 头部部分 */
    header {
      display: flex;
      justify-content: space-between;
      font-size: px2rem(13px);
      width: 100%;

      /* 头部用户名和星星部分 */
      .username_star {
        color: #666;

        /* 用户名 */
        .username {
          margin-bottom: px2rem(7.7px);
        }

        /* 星星部分 */
        .time_spent_desc {
          padding-left: px2rem(4px);
        }

        .star_desc {
          display: flex;
          margin-bottom: px2rem(8px);
        }
      }
    }

    /* 评论图片部分 */
    .food_img_ul {
      display: flex;

      img {
        width: px2rem(71px);
        margin-right: px2rem(10px);
        height: px2rem(71px);
      }
    }

    /* 脚部菜品 */
    .food_name_ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: px2rem(52px);
        font-size: px2rem(3px);
        color: #999;
        border: px2rem(1px) solid #ebebeb;
        padding: px2rem(4.7px);
        margin: px2rem(10px) px2rem(7px) px2rem(4px) 0;
        border: px2rem(2px) solid #e4e4e4;
      }
    }
  }
}
</style>
