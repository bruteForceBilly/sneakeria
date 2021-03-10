/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import products from "@/services/products.js";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
import Product from "../views/Product.vue";
import qs from "qs";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
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

      //console.log("to", to);

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

          // Make boolean ins tore
          // If boolean then pass with query pbject

          if (store.state.search.routeLastDisplayQuery) {
            nextConfig = {
              name: "searchResultRoute",
              params: { slug: params },
              query: query,
            };
            store.commit("search/routeLastDisplayQueryMutation", false);
          } else {
            nextConfig = {
              name: "searchResultRoute",
              params: { slug: params },
            };
          }

          // delete to.query["_page"];
          // delete to.query["_limit"];

          //console.log("nextConfig", nextConfig);

          store.commit("search/routeLastBeforeEnterMutation", to.name);
          next(nextConfig);
        })
        .catch((err) => {
          console.log(err);
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
      // store.state.search.routeLastBeforeEnter === "searchQueryRoute"
      //store.commit("search/routeLastBeforeEnterMutation", to.name);
      store.commit("search/routeLastBeforeEnterMutation", to.name);
      next();
    },
  },
  {
    path: "/product/:product",
    name: "product",
    component: Product,
  },
];

// router.afterEach((to, from) => {
//   // if (process.env.NODE_ENV === "development") {
//   //   console.log("ROUTER TO:\n", to);
//   //   console.log("FROM:\n", from);
//   // }
//   //console.log(store.state.cache.stack);
// });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL, // I havent set a base url?
  routes,
});

export default router;
