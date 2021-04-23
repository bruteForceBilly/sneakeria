/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import products from "@/services/products.js";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
//import Product from "../views/Product.vue";
import Whishlist from "../views/Whishlist.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/', redirect: { name: 'home' }
  },
  {
    path: "/wishlist",
    name: "whishlist",
    component: Whishlist,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/all",
    name: "all",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      store.commit("search/queryParamsObjectMutation", null);
      store.commit("search/queryParamsStringMutation", null);
      store.commit("search/queryParamsKebabMutation", null);
      store.commit("setByRoute", true);
      store.commit("search/foundProductsMutation", null);
      store.commit("search/routeLastBeforeEnterMutation", to.name);

      if(to.query && Object.keys(to.query ).length === 0 && to.query.constructor === Object) {
        to.query._page = 1;
        to.query._limit = 48;
      }
      products("all", to.query, (data) => {
        console.log("dataaaaaa", data)
        if (data !== undefined) {
          store.commit("search/foundProductsMutation", data);
          return data;
        } else {
          return reject(new Error("Products call failed in searchQuery"));
        }
      });
      next();
    },
  },
  {
    path: "/search",
    name: "searchQueryRoute",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      // console.log(
      //   "ROUTER >>>> searchQueryRoute beforeEnter",
      //   "to >>",
      //   to,
      //   "from >>>",
      //   from
      // );

      store.commit("setByRoute", true);

      store.dispatch("cache/writeHistory", to);

      let searchQuery;

      if (store.state.search.routeLastBeforeEnter === "searchRequestRoute") {
        searchQuery = store.state.search.queryParamsObject;
        // Reset all checked options to false then toggle with query params
        store.dispatch("navigation/selectOptionsCheckReset").then(() => {
          if (!store.state.navigation.navigationIsLoading) {
            store.dispatch(
              "navigation/selectOptionsCheckToggle",
              store.state.search.queryParamsObject
            );
          }
        });
      } else {
        store.dispatch("search/queryParamsObjectAction", to);
        searchQuery = store.state.search.queryParamsObject; //to.fullPath.split("?").pop();
      }

      return new Promise(function (resolve, reject) {
        products("search", searchQuery, (data) => {
          if (data !== undefined) {
            store.commit("search/foundProductsMutation", data);
            return resolve(data);
          } else {
            return reject(new Error("Products call failed in searchQuery"));
          }
        });
      })
        .then((response) => {
          let slug = store.getters["search/searchQueryStringKebab"];

          const { params, query } = slug;
          let nextConfig = {};

          if (store.state.search.routeLastDisplayQuery) {
            nextConfig = {
              name: "searchResultRoute",
              params: { slug: params },
              query: query,
            };
            store.commit("search/routeLastDisplayQueryMutation", false);
          } else if (Object.keys(query).some((q) => /^price/.test(q))) {
            nextConfig = {
              name: "searchResultRoute",
              params: { slug: params },
              query: query,
            };
          } else {
            nextConfig = {
              name: "searchResultRoute",
              params: { slug: params },
            };
          }

          store.commit("search/routeLastBeforeEnterMutation", to.name);
          next(nextConfig);
        })
        .catch((err) => {
          //console.log(err);
        });
    },
  },
  {
    path: "/:id",
    name: "searchRequestRoute",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      store.commit("cache/resetStack");

      store
        .dispatch("search/queryParamsObjectAction", to)
        .then(store.commit("search/routeLastBeforeEnterMutation", to.name))
        .then(() => {
          let searchQueryString =
            "/search?" + store.getters["search/searchQueryString"];
          next({
            path: searchQueryString,
          });
        });
    },
  },
  {
    path: "/:slug?",
    name: "searchResultRoute",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      store.commit("setByRoute", false);
      store.commit("search/routeLastBeforeEnterMutation", to.name);
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL, // I havent set a base url?
  routes,
});

export default router;
