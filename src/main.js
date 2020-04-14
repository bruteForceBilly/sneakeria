import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import siteMap from "./services/siteMap.js";

Vue.config.productionTip = false;

siteMap.get().then(data => {
  new Vue({
    router,
    store,
    render: h =>
      h(App, {
        props: {
          test: data
        }
      })
  }).$mount("#app");
});
