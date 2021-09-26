// import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";

// external plugins
import "./plugins/bootstrap-vue";
import "./plugins/fontawesome-vue";
import "./plugins/apexcharts-vue";
import "./plugins/editor-vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
