import Vue from "vue";
import Vuex from "vuex";
import catalog from "./modules/catalog.js";
import search from "./modules/search.js";
import cache from "./modules/cache.js";
import sort from "./modules/sort.js";
import navigation from "./modules/navigation.js";
import wishlist from "./modules/wishlist.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    catalog,
    search,
    cache,
    sort,
    navigation,
    wishlist,
  },
  state: {
    rootData: null,
    setByRoute: null,
  },
  mutations: {
    setByRoute(state, setByRoute) {
      Vue.set(state, "setByRoute", setByRoute);
    },
  },
});
