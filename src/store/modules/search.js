import Vue from "vue";

const state = () => ({
  products: null,
  queryParamsObject: null,
  queryParamsString: null,
  queryParamsKebab: null,
  foundProductsPagination: null,
  foundProducts: null,
  routeLastBeforeEnter: null,
  init: null,
});

const getters = {
  selectedDisplayTitle: (state) => (arr) => {
    const sortValues = function (arr) {
      return arr.reduce((acc, cv) => {
        if (acc.length) {
          for (const [key1, value1] of Object.entries(cv)) {
            for (const [key2, value2] of Object.entries(acc[acc.length - 1])) {
              if (key1 === key2) {
                let temp = {};
                //console.log("jello", key1, key2);
                temp[key2] = [value2, value1];
                acc[acc.length - 1] = temp;
              } else {
                acc.push(cv);
              }
            }
          }
        } else {
          acc.push(cv);
        }

        return acc;
      }, []);
    };

    const makeString = function (arr) {
      return arr.reduce((acc, cv) => {
        Object.values(cv).forEach((value) => {
          acc.push(value.toString().replace(",", "+"));
        });
        return acc;
      }, []);
    };

    if (arr === undefined) {
      return null;
    } else {
      return makeString(sortValues(arr));
    }
  },

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
  queryParamsObjectAction(
    { dispatch, commit, state, getters, rootState, rootGetters },
    to
  ) {
    console.log("queryParamsObjectAction to", to);

    let queryParamsObject;
    let queryParamsObjectArray = [];

    let params = [];
    let query;
    // query = { ...initializePaginationInQuery, ...to.query };

    // To be imported via config
    let initializePaginationInQuery = { _page: "1", _limit: "48" };

    if (to.name === "searchRequestRoute") {
      params = to.params.id.split("-");
    }

    if (to.name === "searchQueryRoute") {
      //params = Object.values(to.query).flat();

      let toQuerySorted = Object.entries(to.query).reduce(
        (acc, cv) => {
          cv.some((el) => /^_/.test(el))
            ? (acc.query[cv[0]] = cv[1])
            : (acc.params[cv[0]] = cv[1]);
          return acc;
        },
        {
          params: {},
          query: {},
        }
      );
      params = Object.values(toQuerySorted.params);

      if (
        toQuerySorted &&
        Object.keys(toQuerySorted.query).length === 0 &&
        toQuerySorted.query.constructor === Object
      ) {
        query = initializePaginationInQuery;
      } else {
        query = toQuerySorted.query;
      }
    }

    console.log("queryParamsObjectAction params", params);

    const findByPropKey = function (arg, table) {
      let res = [];

      if (table && Array.isArray(arg)) {
        res = arg.reduce(function (acc, cv) {
          for (const key of Object.keys(table)) {
            if (table[key].includes(cv)) {
              acc.push({ [key]: cv });
            }
          }
          return acc;
        }, []);
      } else if (table) {
        Object.keys(query).forEach((key) => {
          if (Object.values(table).flat().includes(key)) {
            let temp = {};
            temp[key] = query[key];
            res.push(temp);
          }
        });
      }

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

    const makeQueryParamsObject = function () {
      queryParamsObjectArray.push({
        product: queryString(params, rootGetters["catalog/product"]),
        productProp: findByPropKey(params, rootGetters["catalog/product"]),
      });

      if (findByPropKey(params, rootGetters.productVersion).length > 0) {
        queryParamsObjectArray.push({
          version: queryString(params, rootGetters["catalog/productVersion"]),
          versionProp: findByPropKey(
            params,
            rootGetters["catalog/productVersion"]
          ),
        });
      }

      if (Object.keys(query).length > 0) {
        let foundOperatorProps = findByPropKey(
          query,
          rootGetters["catalog/operator"]
        );
        let operatorPropString = foundOperatorProps
          .reduce((acc, cv) => {
            for (const [key, value] of Object.entries(cv)) {
              acc += `${key}=${value}&`;
            }
            return acc;
          }, "")
          .slice(0, -1);

        queryParamsObjectArray.push({
          operator: operatorPropString,
          operatorProp: foundOperatorProps,
        });
      }

      // check why does the object become
      return (queryParamsObject = queryParamsObjectArray
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
        }, {}));
    };

    // Operator behave differently when searchQueryRoute

    const formatOperator = function () {
      if (to.name === "searchQueryRoute") {
        const { product, version, operator = null } = queryParamsObject;

        if (operator !== null) {
          let res = operator
            .replace(product + "&", "")
            .replace(version + "&", "");

          return (queryParamsObject.operator = res);
        }
      }
    };

    // console.log("queryParamsObject INPUT", to);
    // console.log("queryParamsObject OUTPUT", queryParamsObject);

    // return async () => {
    //   await makeQueryParamsObject();
    //   await formatOperator();
    //   commit("queryParamsObjectMutation", queryParamsObject);
    // };

    makeQueryParamsObject();
    formatOperator();
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
  foundProductsPagination(state, pagination) {
    Vue.set(state, "foundProductsPagination", pagination);
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
