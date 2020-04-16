import Vue from "vue";
import Vuex from "vuex";
import siteMap from "@/services/siteMap.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    siteMap: {
      data2: null
    }
  }),
  actions: {
    fetchSiteMap({ dispatch }, payload) {
      return siteMap(data => {
        dispatch({
          type: "setTest",
          JAAAAA: {
            path: payload,
            siteMap: data
          }
        });
      });
    },
    setTest({ commit }, data) {
      console.log("setTest ran");
      commit("setTest", data);
    }
  },
  mutations: {
    setTest(state, data) {
      Vue.set(state.siteMap, "data2", data);
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
