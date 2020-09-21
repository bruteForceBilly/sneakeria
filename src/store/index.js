import Vue from "vue";
import Vuex from "vuex";
import siteMap from "@/services/siteMap.js";
import load from "./modules/load.js";
import sort from "./modules/sort.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    load,
    sort
  },
  state: {
    rootData: null,
    setByRoute: null,
    searchQueryParamsObject: null,
    searchQueryParamsString: null,
    searchQueryParamsKebab: null,
    searchFoundProducts: null,
    searchRouteLastBeforeEnter: null,
    selectedVersion: null,
    siteMap: {
      data: null,
      loading: null,
      error: null
    }
  },
  getters: {
    searchQueryParamsObject: state => {
      return state.searchQueryParamsObject;
    },
    searchQueryParamsStringKebab: state => {
      return Object.values(state.searchQueryParamsObject)
        .toString()
        .replace(",", "-");
    },
    searchFoundProductsLength: state => {
      if (
        state.searchFoundProducts === null ||
        state.searchFoundProducts.length < 1
      ) {
        return 0;
      } else {
        return state.searchFoundProducts.length;
      }
    }
  },
  actions: {
    searchRequestAction({ dispatch, getters }, payload) {
      return new Promise(resolve => {
        siteMap(data => {
          dispatch({
            type: "searchQueryParamsObjectAction",
            data: {
              path: payload,
              object: data
            }
          });
        }).then(() => {
          resolve(getters.searchQueryParamsObject);
        });
      });
    },
    searchQueryParamsObjectAction({ commit }, searchQueryAction) {
      // FIX - why is there an array there if you dont return it??
      let searchQueryParamsObject = {};
      let arr = [];
      searchQueryAction.data.path.forEach(pathItem => {
        searchQueryAction.data.object.filter(function(obj) {
          if (obj.values.includes(pathItem)) {
            arr.push((searchQueryParamsObject[obj.name] = pathItem));
          }
        });
      });
      return commit("searchQueryParamsObjectMutation", searchQueryParamsObject);
    },

    searchQueryParamsStringAction(
      { dispatch, commit },
      searchQueryParamsObject
    ) {
      dispatch("searchQueryParamsKebabAction", searchQueryParamsObject);

      let searchQueryParamsString = function(obj) {
        let arr = [];
        let makeString = function(key, value) {
          let str = `${key}=${value}`;
          return str;
        };
        for (let [key, value] of Object.entries(obj)) {
          if (Array.isArray(value)) {
            value.forEach(cv => arr.push(makeString(key, cv)));
          } else {
            arr.push(makeString(key, value));
          }
        }
        return arr.toString().replace(/[,]/g, "&");
      };

      return commit(
        "searchQueryParamsStringMutation",
        searchQueryParamsString(searchQueryParamsObject)
      );
    },

    searchQueryParamsKebabAction({ commit }, searchQueryParamsObject) {
      let searchQueryParamsKebab = Object.values(searchQueryParamsObject)
        .toString()
        .replace(/[,]/g, "-");
      return commit("searchQueryParamsKebabMutation", searchQueryParamsKebab);
    },

    siteMapAction({ commit }, siteMapObject) {
      return commit("siteMapMutation", siteMapObject);
    }
  },

  mutations: {
    // rename
    searchQueryParamsObjectMutation(state, searchQueryParamsObject) {
      // console.log(
      //   "VUEX searchQueryParamsObjectMutation >>>",
      //   searchQueryParamsObject
      // );
      // console.log("searchQueryParamsObject", searchQueryParamsObject);
      Vue.set(state, "searchQueryParamsObject", searchQueryParamsObject);
    },
    searchQueryParamsStringMutation(state, searchQueryParamsString) {
      Vue.set(state, "searchQueryParamsString", searchQueryParamsString);
    },
    searchQueryParamsKebabMutation(state, searchQueryParamsKebab) {
      // console.log(
      //   "VUEX searchQueryParamsKebabMutation >>>",
      //   searchQueryParamsKebab
      // );
      Vue.set(state, "searchQueryParamsKebab", searchQueryParamsKebab);
    },
    searchFoundProductsMutation(state, searchFoundProducts) {
      // console.log("VUEX searchFoundProductsMutation >>>", searchFoundProducts);
      Vue.set(state, "searchFoundProducts", searchFoundProducts);
    },
    searchRouteLastBeforeEnterMutation(state, searchRouteLastBeforeEnter) {
      // console.log(
      //   "VUEX searchRouteLastBeforeEnterMutation >>>",
      //   searchRouteLastBeforeEnter
      // );
      Vue.set(state, "searchRouteLastBeforeEnter", searchRouteLastBeforeEnter);
    },
    siteMapMutation(state, siteMapObject) {
      Vue.set(state, "siteMap", siteMapObject);
    },
    setByRoute(state, setByRoute) {
      Vue.set(state, "setByRoute", setByRoute);
    },
    selectedVersionMutation(state, selectedVersion) {
      Vue.set(state, "selectedVersion", selectedVersion);
    }
  }
});
