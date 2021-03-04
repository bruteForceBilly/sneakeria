import Vue from "vue";
import Vuex from "vuex";
import catalog from "./modules/catalog.js";
import search from "./modules/search.js";
import cache from "./modules/cache.js";
import sort from "./modules/sort.js";
import navigation from "./modules/navigation.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    catalog,
    search,
    cache,
    sort,
    navigation,
  },
  state: {
    rootData: null,
    setByRoute: null,
    selectedVersion: null,
  },
  mutations: {
    setByRoute(state, setByRoute) {
      Vue.set(state, "setByRoute", setByRoute);
    },
    selectedVersionMutation(state, selectedVersion) {
      Vue.set(state, "selectedVersion", selectedVersion);
    },
  },
});
