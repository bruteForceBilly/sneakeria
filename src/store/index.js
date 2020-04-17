import Vue from "vue";
import Vuex from "vuex";
import siteMap from "@/services/siteMap.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rootData: null,
    searchQueryParamsObject: null,
    searchFoundProducts: null,
    searchRequestSlugString: null
  },
  getters: {
    searchQueryParamsObjectGetter: state => {
      return state.searchQueryParamsObject;
    },
    searchQueryParamsString: state => {
      // refactor so you can use pass an arg
      let parseResult = "";
      for (let [key, value] of Object.entries(state.searchQueryParamsObject)) {
        parseResult += `${key}=${value}&`;
      }
      return parseResult.slice(0, -1);
    }
  },
  actions: {
    searchRequestAction({ dispatch, getters }, payload) {
      return new Promise(resolve => {
        siteMap(data => {
          dispatch({
            type: "searchQueryAction",
            searchQueryActionData: {
              path: payload,
              object: data
            }
          });
        }).then(() => {
          resolve(getters.searchQueryParamsObjectGetter);
        });
      });
    },
    searchQueryAction({ commit }, rootData) {
      let searchQueryParamsObject = {};
      let arr = [];
      rootData.searchQueryActionData.path.forEach(pathItem => {
        rootData.searchQueryActionData.object.filter(function(obj) {
          if (obj.values.includes(pathItem)) {
            arr.push((searchQueryParamsObject[obj.name] = pathItem));
          }
        });
      });
      return commit("searchQueryMutation", searchQueryParamsObject); //, dispatch("fetchProducts", res);
    }
  },

  mutations: {
    // rename
    searchRequestSlugMutation(state, searchRequestSlugString) {
      Vue.set(state, "searchRequestSlugString", searchRequestSlugString);
    },
    searchQueryMutation(state, searchQueryParamsObject) {
      Vue.set(state, "searchQueryParamsObject", searchQueryParamsObject);
    },
    searchFoundProductsMutation(state, searchFoundProducts) {
      Vue.set(state, "searchFoundProducts", searchFoundProducts);
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

// searchQueryParamsString: state => {
//   let parseResult = "";
//   for (let [key, value] of Object.entries(state.searchQueryParamsObject)) {
//     parseResult += `${key}=${value}&`;
//   }
//   return parseResult.slice(0, -1);
// },
