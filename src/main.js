import Vue from "vue";
import App from "./App.vue";
import { sync } from "vuex-router-sync";
import store from "./store";
import router from "./router";
import media from "./media";
import "tailwindcss/tailwind.css";

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

// listen to some event here from the action
