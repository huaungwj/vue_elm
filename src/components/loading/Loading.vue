<template>
  <div>
    <mu-button color="teal" @click="fullscreen()">全屏加载</mu-button>
  </div>
</template>

<script>
  import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
  import Vue from 'vue';
  import Loading from 'muse-ui-loading';

  Vue.use(Loading);
  export default {
    name: "Loading",
    data() {
      return {}
    },
    methods: {

      fullscreen() {
        const loading = this.$loading({
          // ...options
        });
        setTimeout(() => {
          loading.close();
        }, 3000)
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  px2rem(designpx)
    $rem = 37.5px
    return (designpx / $rem) rem

  .demo-loading-wrap
    width px2rem(100px)
    height px2rem(100px)
    margin 0 auto
    text-align center
    position relative

</style>
