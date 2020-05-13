import Vue from "vue";
import Vuex from "vuex";
import siteMap from "@/services/siteMap.js";
import VuexORM from "@vuex-orm/core";
import User from "@/classes/User";
import Profile from "@/classes/Profile";
import List from "@/classes/List";
import Item from "@/classes/Item";
import Role from "@/classes/Role";
import RoleUser from "@/classes/RoleUser";
import Image from "@/classes/Image";
import Post from "@/classes/Post";
import Video from "@/classes/Video";
import Comment from "@/classes/Comment";
import Tag from "@/classes/Tag";
import Taggable from "@/classes/Taggable";

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(User);
database.register(Profile);
database.register(List);
database.register(Item);
database.register(Role);
database.register(RoleUser);
database.register(Image);
database.register(Post);
database.register(Video);
database.register(Comment);
database.register(Tag);
database.register(Taggable);

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
