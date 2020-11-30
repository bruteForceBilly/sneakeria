import Vue from "vue";
import Vuex from "vuex";
import search from "./modules/search.js";
import load from "./modules/load.js";
import sort from "./modules/sort.js";
import navigation from "./modules/navigation.js";
import schemas from "./modules/schemas.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search,
    load,
    sort,
    navigation,
    schemas,
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
