/* eslint-disable no-unused-vars */
import getCatalog from "@/services/catalog.js";
import Vue from "vue";

const state = () => ({
  queryParamsObject: null,
  queryParamsString: null,
  queryParamsKebab: null,
  foundProducts: null,
  routeLastBeforeEnter: null,
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
  // searchRequestAction
  serviceRequestAction({ dispatch, state }, pathArrayOfStrings) {
    // import schema here to to find

    // move find by prop key to queryParamsObjectAction
    // depricate array data

    return new Promise((resolve) => {
      getCatalog((data) => {
        //console.log("STORE serviceRequestAction getCatalog", data, payload);
        dispatch({
          type: "queryParamsObjectAction",
          data: {
            path: pathArrayOfStrings,
            array: data, // chnage to prop in state that instead should be fetch once on app load
          },
        });
      }).then(() => {
        resolve(state.queryParamsObject);
      });
    });
  },
  queryParamsObjectAction({ commit, rootState }, queryAction) {
    // If no product key find then do version getter
    const queryParamsObjectArray = [];
    const { path, array } = queryAction.data;

    const findByPropKey = function (arr, table) {
      return arr.reduce(function (acc, cv) {
        for (const key of Object.keys(table)) {
          if (table[key].includes(cv)) {
            acc.push({ [key]: cv });
          }
        }
        return acc;
      }, []);
    };

    queryParamsObjectArray.push(findByPropKey(path, rootState.schemas.product));

    if (findByPropKey(path, rootState.schemas.productVersion).length > 0) {
      queryParamsObjectArray.push(
        findByPropKey(path, rootState.schemas.productVersion)
      );
    }

    // check why does the object become
    let queryParamsObject = queryParamsObjectArray
      .flat()
      .reduce(function (prev, next) {
        let prevKeys = Object.keys(prev);
        let nextKey = Object.keys(next).pop();

        if (prevKeys.includes(nextKey)) {
          prev[nextKey].push(next[nextKey].pop());
        } else {
          prev = { ...prev, ...next };
        }

        return prev;
      }, {});

    console.log("queryParamsObject", queryParamsObject);

    return commit("queryParamsObjectMutation", queryParamsObject);
  },

  queryParamsStringAction({ dispatch, commit }, queryParamsObject) {
    // fn arg is queryParamsObject OR to.query from router
    // Are they refereing to the same object or is one a copy?
    dispatch("queryParamsKebabAction", queryParamsObject);

    let queryParamsString = "";

    for (const [key, value] of Object.entries(queryParamsObject)) {
      value.forEach((val) => {
        queryParamsString += `${key}=${val}&`;
      });
    }
    return commit("queryParamsStringMutation", queryParamsString.slice(0, -1));
  },

  queryParamsKebabAction({ commit }, queryParamsObject) {
    let queryParamsKebab = Object.values(queryParamsObject)
      .toString()
      .replace(/[,]/g, "-");
    return commit("queryParamsKebabMutation", queryParamsKebab);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
