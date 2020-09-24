import axios from "axios";
import { API_SITE } from "@/constants";
import Vue from "vue";

const state = () => ({
  queryParamsObject: null,
  queryParamsString: null,
  queryParamsKebab: null,
  foundProducts: null,
  routeLastBeforeEnter: null,
  siteMap: {
    data: null,
    loading: null,
    error: null,
  },
});

const getters = {
  queryParamsObject: (state) => {
    return state.queryParamsObject;
  },
  queryParamsStringKebab: (state) => {
    // BUG leaves a , anyway sometimes!
    return Object.values(state.queryParamsObject).toString().replace(",", "-");
  },
  foundProducts: (state) => {
    return state.foundProducts;
  },
  foundProductsLength: (state) => {
    if (state.foundProducts === null || state.foundProducts.length < 1) {
      return 0;
    } else {
      return state.foundProducts.length;
    }
  },
};

const actions = {
  serviceRequestAction({ dispatch, getters }, payload) {
    const getSiteMap = function (cb) {
      return axios
        .get(API_SITE)
        .then((response) => cb(response.data))
        .catch((err) => cb(err.toString()));
    };
    return new Promise((resolve) => {
      getSiteMap((data) => {
        dispatch({
          type: "queryParamsObjectAction",
          data: {
            path: payload,
            object: data,
          },
        });
      }).then(() => {
        resolve(getters.queryParamsObject);
      });
    });
  },
  queryParamsObjectAction({ commit }, queryAction) {
    let queryParamsObject = {};
    let arr = [];
    queryAction.data.path.forEach((pathItem) => {
      queryAction.data.object.filter(function (obj) {
        if (obj.values.includes(pathItem)) {
          arr.push((queryParamsObject[obj.name] = pathItem));
        }
      });
    });
    return commit("queryParamsObjectMutation", queryParamsObject);
  },

  queryParamsStringAction({ dispatch, commit }, queryParamsObject) {
    dispatch("queryParamsKebabAction", queryParamsObject);

    let queryParamsString = function (obj) {
      let arr = [];
      let makeString = function (key, value) {
        let str = `${key}=${value}`;
        return str;
      };
      for (let [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
          value.forEach((cv) => arr.push(makeString(key, cv)));
        } else {
          arr.push(makeString(key, value));
        }
      }
      return arr.toString().replace(/[,]/g, "&");
    };

    return commit(
      "queryParamsStringMutation",
      queryParamsString(queryParamsObject)
    );
  },

  queryParamsKebabAction({ commit }, queryParamsObject) {
    let queryParamsKebab = Object.values(queryParamsObject)
      .toString()
      .replace(/[,]/g, "-");
    return commit("queryParamsKebabMutation", queryParamsKebab);
  },
  siteMapAction({ commit }, siteMapObject) {
    return commit("siteMapMutation", siteMapObject);
  },
};

const mutations = {
  queryParamsObjectMutation(state, queryParamsObject) {
    Vue.set(state, "queryParamsObject", queryParamsObject);
  },
  queryParamsStringMutation(state, queryParamsString) {
    Vue.set(state, "queryParamsString", queryParamsString);
  },
  queryParamsKebabMutation(state, queryParamsKebab) {
    Vue.set(state, "queryParamsKebab", queryParamsKebab);
  },
  foundProductsMutation(state, foundProducts) {
    Vue.set(state, "foundProducts", foundProducts);
  },
  routeLastBeforeEnterMutation(state, routeLastBeforeEnter) {
    Vue.set(state, "routeLastBeforeEnter", routeLastBeforeEnter);
  },
  siteMapMutation(state, siteMapObject) {
    Vue.set(state, "siteMap", siteMapObject);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
