import Vue from "vue";
import Vuex from "vuex";
import siteMap from "./modules/siteMap";
import route from "./modules/route";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    siteMap,
    route
  }
});
