import Vue from "vue";
import Vuex from "vuex";
import siteMap from "@/services/siteMap.js";
import VuexORM from "@vuex-orm/core";
import Product from "@/models/Product";
import Version from "@/models/Version";
import Category from "@/models/Category";
import Option from "@/models/Option";

import Catalog from "@/models/Catalog";
import Level from "@/models/Level";
import Group from "@/models/Group";
import GroupLevel from "@/models/GroupLevel";
import GroupOption from "@/models/GroupOption";

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(Product);
database.register(Version);
database.register(Category);
database.register(Option);
database.register(Catalog);
database.register(Level);
database.register(Group);
database.register(GroupLevel);
database.register(GroupOption);

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {
    rootData: null,
    setByRoute: null, // filterSetByRoute
    filterBarNoneSelected: null,
    searchQueryParamsObject: null,
    searchQueryParamsString: null,
    searchQueryParamsKebab: null,
    searchFoundProducts: null,
    searchRouteLastBeforeEnter: null,
    selectedVersion: null,
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
      // FIX - why is there an array there if you dont return it??
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
      dispatch("searchQueryParamsKebabAction", searchQueryParamsObject);

      let searchQueryParamsString = function(obj) {
        let arr = [];
        let makeString = function(key, value) {
          let str = `${key}=${value}`;
          return str;
        };
        for (let [key, value] of Object.entries(obj)) {
          if (Array.isArray(value)) {
            value.forEach(cv => arr.push(makeString(key, cv)));
          } else {
            arr.push(makeString(key, value));
          }
        }
        return arr.toString().replace(/[,]/g, "&");
      };

      return commit(
        "searchQueryParamsStringMutation",
        searchQueryParamsString(searchQueryParamsObject)
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
      // console.log("searchQueryParamsObject", searchQueryParamsObject);
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
      // console.log("VUEX searchFoundProductsMutation >>>", searchFoundProducts);
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
    },
    filterBarNoneSelectedMutation(state, filterBarNoneSelected) {
      Vue.set(state, "filterBarNoneSelected", filterBarNoneSelected);
    },
    selectedVersionMutation(state, selectedVersion) {
      Vue.set(state, "selectedVersion", selectedVersion);
    }
  }
});
