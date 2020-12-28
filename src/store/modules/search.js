/* eslint-disable no-unused-vars */
import getCatalog from "@/services/catalog.js";
import Vue from "vue";

const state = () => ({
  queryParamsObject: null,
  queryParamsString: null,
  queryParamsKebab: null,
  foundProducts: null,
  routeLastBeforeEnter: null,
  init: null,
});

const getters = {
  queryParamsObject: (state) => {
    return state.queryParamsObject;
  },
  queryParamsObjectFlat: (state, getters) => {
    let copyQueryParamsObject = { ...getters.queryParamsObject };
    const recur = function (n) {
      let acc = {};
      const run = function (n) {
        if (Array.isArray(n)) {
          n.forEach((cv) => {
            for (const [key, value] of Object.entries(cv)) {
              acc[key] = value;
            }
          });
        } else {
          Object.keys(n).forEach((key) => run(n[key]));
        }
      };
      run(n);
      return acc;
    };

    let queryParamsObjectFlat = recur(copyQueryParamsObject);

    return queryParamsObjectFlat;
  },
  queryParamsStringKebab: (state, getters) => {
    // CHECK IF THIS WORKS FOR VERSION AND OPERATORS
    let copy = { ...getters.queryParamsObjectFlat };
    let res = "";
    Object.values(copy).forEach((word) => (res += `${word}-`));
    return res.slice(0, -1);
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
  foundProductsPricesOffered: (state, getters) => {
    return getters.foundProducts
      .map((product) => product.versions)
      .flat()
      .map((version) => version.price.amountOffered);
  },
};

const actions = {
  // searchRequestAction
  serviceRequestAction({ dispatch, state, getters }, to) {
    return new Promise((resolve) => {
      getCatalog((resBody) => {
        let { id } = to.params;
        //console.log("to & id", to, id);
        //debugger;
        dispatch({
          type: "queryParamsObjectAction",
          data: {
            params: id.split("-"),
            query: to.query,
            body: resBody, // We are using Schemas Instead of this? response?
          },
        });
      }).then(() => {
        resolve(getters.queryParamsObjectFlat);
      });
    });
  },
  queryParamsObjectAction({ commit, rootState }, queryAction) {
    //console.log("queryAction !!!!", queryAction);
    const queryParamsObjectArray = [];
    const { params, query, body } = queryAction.data;

    // Look up is handled in product service right now!
    // We are getting { product: [{},{}]}
    // BUT!! THIS IS FINE: { section: ["men"], category: ["shoes"]}

    // WE NEED TO UNIFY HOW WE PASS INPUT TO THIS FUNCTION SO THAT
    // WE CAN PASS ARG OBJ FROM SELECTINO BAR SETTINGS TO HERE

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

    queryParamsObjectArray.push({
      product: findByPropKey(params, rootState.schemas.product),
      //product: findByPropKey(params, response),
    });

    if (findByPropKey(params, rootState.schemas.productVersion).length > 0) {
      queryParamsObjectArray.push({
        version: findByPropKey(params, rootState.schemas.productVersion),
      });
    }

    if (Object.keys(query).length > 0) {
      let res = [];
      for (const [key, value] of Object.entries(query)) {
        let lit = {};
        lit[key] = value;
        res.push(lit);
      }
      queryParamsObjectArray.push({
        operator: res,
      });
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

    console.log("queryParamsObject queryAction INPUT", queryAction);
    console.log("queryParamsObject OUTPUT", queryParamsObject);

    return commit("queryParamsObjectMutation", queryParamsObject);
  },

  queryParamsStringAction({ dispatch, commit }, queryParamsObject) {
    // fn arg is queryParamsObject OR to.query from router
    // Are they refereing to the same object or is one a copy?

    // products?section=men&category=shoes
    // versions?color=red

    // queryParamsString :{ products: products?section=men&category=shoes, versions: versions?color=red}
    dispatch("queryParamsKebabAction", queryParamsObject);

    const makeString = function (arg) {
      let res = arg.reduce(function (acc, cv) {
        for (const [key, value] of Object.entries(cv)) {
          acc += `${key}=${value}&`;
        }
        return acc;
      }, "");

      return res.slice(0, -1);
    };

    const queryParamsString = Object.keys(queryParamsObject).reduce(function (
      acc,
      cv
    ) {
      acc[cv] = makeString(queryParamsObject[cv]);
      return acc;
    },
    {});

    console.log("queryParamsStringAction queryParamsObject", queryParamsObject);
    console.log("queryParamsStringAction queryParamsString", queryParamsString);

    return commit("queryParamsStringMutation", queryParamsString);
  },

  queryParamsKebabAction({ commit }, queryParamsObject) {
    let queryParamsKebab;
    let res = [];
    Object.keys(queryParamsObject).forEach((key) => {
      res.push(
        queryParamsObject[key].reduce(function (acc, cv) {
          return acc.concat(Object.values(cv));
        }, [])
      );
    });

    queryParamsKebab = res.flat().toString().replace(/[,]/g, "-");

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
