import Vue from "vue";
import Vuex from "vuex";
import siteMap from "@/services/siteMap.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rootData: null,
    setByRoute: null,
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
  },
  getters: {
    searchQueryParamsObject: state => {
      return state.searchQueryParamsObject;
    },
    searchQueryParamsStringKebab: state => {
      return Object.values(state.searchQueryParamsObject)
        .toString()
        .replace(",", "-");
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
      let searchQueryParamsString = "";

      for (let [key, value] of Object.entries(searchQueryParamsObject)) {
        searchQueryParamsString += `${key}=${value}&`;
      }

      dispatch("searchQueryParamsKebabAction", searchQueryParamsObject);

      return commit(
        "searchQueryParamsStringMutation",
        searchQueryParamsString.slice(0, -1)
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
      //console.log("VUEX searchFoundProductsMutation >>>", searchFoundProducts);
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
