import Vue  from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import 'muse-ui/dist/muse-ui.css';
import MuseUI from 'muse-ui';
Vue.use(MuseUI);

import '../public/css/reset.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

// createApp(App).use(router).use(store).mount('#app');
