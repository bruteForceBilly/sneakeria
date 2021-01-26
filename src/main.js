import Vue from "vue";
import App from "./App.vue";
import { sync } from "vuex-router-sync";
import store from "./store";
import router from "./router";
import media from "./media";
import PortalVue from "portal-vue";
import "./assets/css/tailwind.css";

Vue.config.productionTip = false;

sync(store, router);

Vue.use(PortalVue);

window.App = new Vue({
  router,
  store,
  media,
  render: (h) => h(App),
}).$mount("#app");
