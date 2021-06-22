<template>
  <header class="head_top ellipsis">
    <div class="left"><slot name="left"></slot></div>

    <div class="center ellipsis"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </header>
</template>

<script>
  export default {
    name: "heardTop"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  px2rem(designpx)
    $rem = 37.5px; //10rem = 375
    return (designpx / $rem )rem
  .head_top
    position fixed
    z-index 300
    left 0
    top 0
    width 100%
    height px2rem(44px)
    background #3190e8
    display flex
    justify-content space-around
    align-items center
    text-align center
    .center
      width px2rem(190px)
      line-height px2rem(44px)
      color  #fff
      font-size px2rem(17px)
    .left
      display flex
    .right
      line-height px2rem(44px)





</style>
