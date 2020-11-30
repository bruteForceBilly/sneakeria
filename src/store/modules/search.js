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
  queryParamsObjectAction({ commit }, queryAction) {
    const { path, array } = queryAction.data;

    let queryParamsObjectArray = array.reduce(function (acc, cv) {
      path.forEach((val) => {
        if (cv.options.map((option) => option.value).includes(val)) {
          const { name } = cv;
          acc.push({ [name]: [val] });
        }
      });
      return acc;
    }, []);
    // in else push cv to array
    let queryParamsObject = queryParamsObjectArray.reduce(function (
      prev,
      next
    ) {
      let prevKeys = Object.keys(prev);
      let nextKey = Object.keys(next).pop();

      if (prevKeys.includes(nextKey)) {
        prev[nextKey].push(next[nextKey].pop());
      } else {
        prev = { ...prev, ...next };
      }

      return prev;
    },
    {});
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
