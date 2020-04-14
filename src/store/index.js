import Vue from "vue";
import Vuex from "vuex";
import siteMap from "./modules/siteMap";
import route from "./modules/route";

Vue.use(Vuex);

const myPlugin = store => {
  store.subscribeAction({
    after: (action, state) => {
      if (action.type === "siteMap/getSiteMap") {
        console.log(`after action ${action.type}`, state);
      }
    }
  });

  store.subscribeAction({
    after: (action, state) => {
      if (action.type === "route/setRouteTo") {
        console.log(`after action ${action.type}`, state);
      }
    }
  });
};

export default new Vuex.Store({
  modules: {
    siteMap,
    route
  },
  plugins: [myPlugin]
});

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
