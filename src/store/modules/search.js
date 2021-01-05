/* eslint-disable no-unused-vars */
import getCatalog from "@/services/catalog.js";
import Vue from "vue";

const state = () => ({
  products: null,
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
  searchQueryString: (state) => {
    const copyQueryParamsObject = { ...state.queryParamsObject };
    const { product, version, operator } = copyQueryParamsObject;
    let res = [product, version, operator]
      .reduce((acc, cv) => {
        if (cv === undefined) {
          acc += "";
        } else {
          acc += cv + "&";
        }
        return acc;
      }, "")
      .slice(0, -1);
    return res;
  },
  searchQueryStringKebab: (state) => {
    const copyQueryParamsObject = { ...state.queryParamsObject };

    const { product = null, version = null, operator } = copyQueryParamsObject;

    // empty string is not a good init value

    let operatorStringToObject = null;

    if (operator === "" || operator === undefined) {
      operatorStringToObject = null;
    } else {
      operatorStringToObject = operator.split("&").reduce((acc, cv) => {
        let arr = cv.split("=");
        let res = {};
        res[arr[0]] = arr[arr.length - 1];
        return { ...acc, ...res };
      }, {});
    }

    const kebabify = function (input) {
      if (input === null) {
        return null;
      } else {
        return input
          .split("&")
          .reduce((acc, cv) => {
            acc += cv.split("=").pop() + "-";
            return acc;
          }, "")
          .slice(0, -1);
      }
    };

    let productString = kebabify(product);

    let versionString = kebabify(version);

    let productVersionString = () => {
      if (!productString && !versionString) {
        return "";
      } else if (productString && !versionString) {
        return productString;
      } else if (!productString && versionString) {
        return versionString;
      } else if (productString && versionString) {
        return productString + "-" + versionString;
      }
    };

    const makeString = function () {
      if (operator === undefined) {
        return {
          params: productVersionString(),
          query: null,
        };
      } else {
        return {
          params: productVersionString(),
          query: operatorStringToObject,
        };
      }
    };

    return makeString();
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
  queryParamsObjectAction({ commit, rootState }, to) {
    const queryParamsObjectArray = [];

    let params = [];
    let query = {};

    if (to.name === "searchQueryRoute") {
      params = Object.values(to.query);
      query = Object.keys(to.query);
    } else if (to.name === "searchRequestRoute") {
      query = to.query;
      params = to.params.id.split("-");
    }

    const findByPropKey = function (arr, table) {
      let res = arr.reduce(function (acc, cv) {
        for (const key of Object.keys(table)) {
          if (table[key].includes(cv)) {
            acc.push({ [key]: cv });
          }
        }
        return acc;
      }, []);
      return res;
    };

    const objectToString = function (object) {
      let res = "";
      for (const [key, value] of Object.entries(object)) {
        res += `${key}=${value}&`;
      }
      return res.slice(0, -1);
    };

    const queryString = function (params, table) {
      return findByPropKey(params, table)
        .reduce((acc, cv) => {
          acc += objectToString(cv) + "&";
          return acc;
        }, "")
        .slice(0, -1);
    };

    queryParamsObjectArray.push({
      product: queryString(params, rootState.schemas.product),
      productProp: findByPropKey(params, rootState.schemas.product),
    });

    if (findByPropKey(params, rootState.schemas.productVersion).length > 0) {
      queryParamsObjectArray.push({
        version: queryString(params, rootState.schemas.productVersion),
        versionProp: findByPropKey(params, rootState.schemas.productVersion),
      });
    }

    if (to.name === "searchRequestRoute" && Object.keys(query).length > 0) {
      let res = "";
      for (const [key, value] of Object.entries(to.query)) {
        res += `${key}=${value}&`;
      }
      queryParamsObjectArray.push({
        operator: res.slice(0, -1),
      });
    }

    if (to.name === "searchQueryRoute") {
      //Array.from(queryString(params, rootState.schemas.operator)).length > 0

      let foundOperatorProps = findByPropKey(
        query,
        rootState.schemas.operator
      ).reduce((acc, cv) => {
        acc.push(Object.values(cv));
        return acc.flat();
      }, []);

      let operatorProp = foundOperatorProps.reduce((acc, cv) => {
        let res = {};
        res[cv] = to.query[cv];
        acc.push(res);
        return acc;
      }, []);

      let operatorPropString = operatorProp
        .reduce((acc, cv) => {
          for (const [key, value] of Object.entries(cv)) {
            acc += `${key}=${value}&`;
          }
          return acc;
        }, "")
        .slice(0, -1);

      queryParamsObjectArray.push({
        operator: operatorPropString,
        operatorProp: operatorProp,
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

    // Operator behave differently when searchQueryRoute

    if (to.name === "searchQueryRoute") {
      const { product, version, operator = null } = queryParamsObject;

      if (operator !== null) {
        let res = operator
          .replace(product + "&", "")
          .replace(version + "&", "");

        queryParamsObject.operator = res;
      }
    }

    // console.log("queryParamsObject INPUT", to);
    // console.log("queryParamsObject OUTPUT", queryParamsObject);

    return commit("queryParamsObjectMutation", queryParamsObject);
  },

  queryParamsStringAction({ dispatch, commit }, queryParamsObject) {
    // fn arg is queryParamsObject OR to.query from router
    // Are they refereing to the same object or is one a copy?

    //console.log("queryParamsStringAction");

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

    // console.log("queryParamsStringAction queryParamsObject", queryParamsObject);
    // console.log("queryParamsStringAction queryParamsString", queryParamsString);

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

    // console.log("queryParamsKebabAction queryParamsObject", queryParamsObject);
    // console.log("queryParamsKebabAction queryParamsKebab", queryParamsKebab);

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
