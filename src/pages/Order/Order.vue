<template>
  <div>
    <head-top>
      <a style="color: #fff" slot="left" @click="$router.back()">
        <i style="color: #fff; font-size: 24px" class="iconfont icon-arrow_left"></i>
      </a>
      <a style="color: #fff" href="#" slot="center">
        <span style="color: #fff;font-size: 20px">所有订单</span>
      </a>
    </head-top>
  </div>
</template>

<script>
  import headTop from "../../components/headTop/headTop";

  export default {
    name: "Order",
    components: {
      headTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
