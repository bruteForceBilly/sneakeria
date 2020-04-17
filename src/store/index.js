import Vue from "vue";
import Vuex from "vuex";
import siteMap from "@/services/siteMap.js";
import products from "@/services/products.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    products: null
  },
  actions: {
    fetchSiteMap({ dispatch }, payload) {
      return siteMap(data => {
        dispatch({
          type: "setSiteMap",
          data: {
            path: payload,
            object: data
          }
        });
      });
    },
    setSiteMap({ dispatch, commit }, data) {
      let res = {};
      let arr = [];
      data.data.path.forEach(pathItem => {
        data.data.object.filter(function(obj) {
          if (obj.values.includes(pathItem)) {
            arr.push((res[obj.name] = pathItem));
          }
        });
      });
      return commit("setSiteMap", res), dispatch("fetchProducts", res);
    },
    fetchProducts({ commit }, payload) {
      let routeQueryString = "";
      for (let [key, value] of Object.entries(payload)) {
        routeQueryString += `${key}=${value}&`;
      }
      return products(routeQueryString.slice(0, -1), data => {
        commit("setProducts", data);
      });
    }
  },

  mutations: {
    setSiteMap(state, data) {
      Vue.set(state, "data", data);
    },
    setProducts(state, data) {
      Vue.set(state, "products", data);
    }
  }
});

// .then(data => {
//   console.log("then ran in fetch siteMap");
//   dispatch("setTest", data);
// });

// let res = {};
// let arr = [];
// pathArray.forEach(pathItem => {
//   this.state.siteMap.filter(function(obj) {
//     if (obj.values.includes(pathItem)) {
//       arr.push((res[obj.name] = pathItem));
//     }
//   });
// });

/*
state() {
  siteMap.get().then(data => {
    console.log(data);
    return {
      test: "test"
    };
  });
}, */

// (state, getters) => {
//   // refactor to use redcue instead of object like this
//   // mvoe to mutation?
//   // SHould be a plugin?
//   let res = {};
//   let arr = [];
//   getters.toPathAsArray.forEach(function(pathItem) {
//     state.foundQueryParams.data.filter(function(obj) {
//       if (obj.values.includes(pathItem)) {
//         arr.push((res[obj.name] = pathItem));
//       }
//     });
//   });
//   return res;
// };

// const myPlugin = store => {
//   store.subscribeAction({
//     after: (action, state) => {
//       if (action.type === "route/setRouteTo") {
//         console.log(`after action ${action.type}`, state);
//       }
//     }
//   });
// };
