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

      console.log("searchQueryRoute !!!!!!!!!!!!", to);

      //store.dispatch("search/queryParamsObjectAction", to);

      // if (store.state.search.routeLastBeforeEnter !== "searchRequestRoute") {
      //   console.log("!!!!!!!!!!!!!!!!!!!!!!!  not searchRequestRoute");
      //   store.dispatch("search/queryParamsObjectAction", to);
      // }

      products("search", store.state.search.queryParamsObject, (data) => {
        store.commit("search/foundProductsMutation", data);
        // Check toggle not working properly!!
        // store.dispatch(
        //   "navigation/selectOptionsCheckToggle",
        //   store.getters["search/queryParamsObject"]
        // );
      })
        .then(() => {
          store.commit("search/routeLastBeforeEnterMutation", to.name);
          let slug = store.getters["search/searchQueryStringKebab"];
          console.log("slug", slug);
          next({
            name: "searchResultRoute",
            params: { slug: slug },
          });
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
      store.commit("load/countReset");

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
      // console.log(
      //   "LOOOK searchResultRoute",
      //   "to >>>",
      //   to,
      //   "from >>>>",
      //   from.query
      // );

      store.commit("setByRoute", false);

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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL, // I havent set a base url?
  routes,
});

// router.afterEach((to, from) => {
//   if (process.env.NODE_ENV === "development") {
//     console.log("ROUTER TO:\n", to);
//     console.log("FROM:\n", from);
//   }
// });

export default router;
