import Vue from 'vue'
import App from './App.vue'
import api from './fetch/api'
import router from "./router";

Vue.config.productionTip = false
Vue.prototype.$api = api;;
//Vue.prototype.$apis = initFetch;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
