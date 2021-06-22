<template>
    <!--    <div class="star star-24" :class="'star-'+size">-->
    <div class="star star-24" >

      <!--      <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>-->
      <span class="star-item on"></span>
      <span class="star-item on"></span>
      <span class="star-item on"></span>
      <span class="star-item on"></span>
      <span class="star-item on"></span>
  </div>
</template>

<script>
  export default {
    name: "Star"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 9px
        height 9px
        margin-right .5px
        background-size 9px 9px

        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
