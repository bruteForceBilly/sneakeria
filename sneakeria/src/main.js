import Vue from "vue";
import App from "./App.vue";
import { sync } from "vuex-router-sync";
import store from "./store";
import router from "./router";
import media from "./media";
import "@fontsource/ibm-plex-mono";
import "tailwindcss/tailwind.css";
import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);

Vue.config.productionTip = false;

store.dispatch("catalog/initialize").then(() => {
  store.dispatch("navigation/navigationInitAction").then(() => {
    store.dispatch(
      "navigation/selectOptionsCheckToggle",
      store.state.search.queryParamsObject
    );
  });

  sync(store, router);
  window.App = new Vue({
    router,
    store,
    media,
    render: (h) => h(App),
  }).$mount("#app");
});
