import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/iconfont/iconfont.css"
import "./assets/css/common.css"
import axios from "axios"
import Scroller from "./components/Scroller/scroller"
import Loading from "./components/Loading/loading"

// import "lib-flexible/flexible.js"

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.component("Scroller",Scroller)
Vue.component("Loading",Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
