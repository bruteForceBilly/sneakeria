import Vue from "vue";
import siteMap from "@/services/siteMap.js";

const state = () => ({
  searchQueryParamsObject: null,
  searchQueryParamsString: null,
  searchQueryParamsKebab: null,
  searchFoundProducts: null,
  searchRouteLastBeforeEnter: null,
  siteMap: {
    data: null,
    loading: null,
    error: null
  }
});

const getters = {
  searchQueryParamsObject: state => {
    return state.searchQueryParamsObject;
  },
  searchQueryParamsStringKebab: state => {
    return Object.values(state.searchQueryParamsObject)
      .toString()
      .replace(",", "-");
  },
  searchFoundProducts: state => {
    return state.searchFoundProducts;
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
};

const actions = {
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

  searchQueryParamsStringAction({ dispatch, commit }, searchQueryParamsObject) {
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
};

const mutations = {
  searchQueryParamsObjectMutation(state, searchQueryParamsObject) {
    Vue.set(state, "searchQueryParamsObject", searchQueryParamsObject);
  },
  searchQueryParamsStringMutation(state, searchQueryParamsString) {
    Vue.set(state, "searchQueryParamsString", searchQueryParamsString);
  },
  searchQueryParamsKebabMutation(state, searchQueryParamsKebab) {
    Vue.set(state, "searchQueryParamsKebab", searchQueryParamsKebab);
  },
  searchFoundProductsMutation(state, searchFoundProducts) {
    Vue.set(state, "searchFoundProducts", searchFoundProducts);
  },
  searchRouteLastBeforeEnterMutation(state, searchRouteLastBeforeEnter) {
    Vue.set(state, "searchRouteLastBeforeEnter", searchRouteLastBeforeEnter);
  },
  siteMapMutation(state, siteMapObject) {
    Vue.set(state, "siteMap", siteMapObject);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
