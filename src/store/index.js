import Vue from "vue";
import Vuex from "vuex";
import siteMap from "./modules/siteMap";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    siteMap: siteMap
  }
});
