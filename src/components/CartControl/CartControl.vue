<template>
  <div class="cartcontrol">
    <transition name="Showcartcontrol">
    <section class="iconfont icon-jianshao1 reduce-count" v-if="food.count" @click="updataFoodCount(false)">
    </section>
    </transition>
    <transition name="ShowCount">
    <section class="cart-count" v-if="food.count">{{food.count}}</section>
    </transition>  
    <section class="iconfont icon-zengjia" @click="updataFoodCount(true)"></section>
  </div>
</template>
<script>

import Vue from 'vue';
export default {
  name: "cartControl",
  data() {
    return {};
  },
  props: {
    food: Object
  },
  created(){
    // console.log(this.food);
  },
  methods: {
    /* 是否增加 */
    updataFoodCount(isAdd){
      console.log('123',this.food);
     this.$store.dispatch('UpdateFoodCount',{isAdd: isAdd,food: this.food})
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  px2rem(designpx)
    $rem = 37.5px
    return (designpx / $rem) rem
    
  .cartcontrol
    display flex
    justify-content center
    align-items center
    padding-right px2rem(5px)
    color #3190e8
    font-size px2rem(16px)
    .cart-count
      padding-left px2rem(5px)
      padding-right px2rem(5px)
      transform translate(0%,0)
    .reduce-count
      transform translate(0%,0)
    
  // 动画
.Showcartcontrol-enter-active,
.Showcartcontrol-leave-active
  transition: all 0.3s;
  transform: translateX(0);

.Showcartcontrol-enter,
.Showcartcontrol-leave-active
  opacity: 0;
  transform: translateX(220%);

.ShowCount-enter-active,
.ShowCount-leave-active
  transition: all 0.3s;
  transform: translateX(0);

.ShowCount-enter,
.ShowCount-leave-active
  opacity: 0;
  transform: translateX(80%);
</style>
