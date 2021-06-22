<template>
  <div id="">
      <router-view></router-view>
    <FootGuide v-if="isShow"/>

  </div>
</template>

<script>
  import FootGuide from "./components/FootGuide/FootGuide";
  import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
  import Vue from 'vue';
  import Loading from 'muse-ui-loading';

  Vue.use(Loading);

  export default {
    name: "App",
    components: {
      FootGuide
    },
    computed: {
      isShow() {
        let reg = /(home|city|food|shop)/i;
        return !reg.test(this.$route.path);
      }
    },
    methods: {
      fullscreen() {
        const loading = this.$loading()
        setTimeout(() => {
          loading?.close()
        }, 300)
      }
    },
    updated() {
      this.fullscreen()
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }

</style>
