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

      // SEARCH QUERY ROUTE DEMANDS QUERY PARAMS OBJECT

      let searchQueryParamsString = to.fullPath.split("?").pop();

      console.log("searchQueryParamsString", searchQueryParamsString);

      products("filter", searchQueryParamsString, (data) => {
        store.commit("search/foundProductsMutation", data);
        store.dispatch(
          "navigation/selectOptionsCheckToggle",
          store.getters["search/queryParamsObject"]
        );
      })
        .then(() => {
          store.commit("search/routeLastBeforeEnterMutation", to.name);
          // console.log(
          //   "ROUTER THEN queryParamsStringKebab",
          //   store.getters["search/queryParamsObject"],
          //   store.getters["search/queryParamsStringKebab"]
          // );
          next({
            name: "searchResultRoute",
            params: { slug: store.getters["search/queryParamsStringKebab"] },
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // return new Promise((resolve, reject) => {
      //   products("filter", searchQueryParamsString, (data) => {
      //     store.commit("search/foundProductsMutation", data);
      //     store.dispatch(
      //       "navigation/selectOptionsCheckToggle",
      //       store.getters["search/queryParamsObject"]
      //     );
      //   }).then((test) => {
      //     next({
      //       name: "searchResultRoute",
      //       params: { slug: store.getters["search/queryParamsStringKebab"] },
      //     })
      //   });
      // }).then(
      //   // update selects in store so that the componenet dosent have to
      //   //store.commit("setByRoute", false),
      //   store.commit("search/routeLastBeforeEnterMutation", to.name)
      //   //console.log("ROUTER searchRouteLastBeforeEnterMutation", to.name)
      // );
    },
  },
  {
    path: "/:id",
    name: "searchRequestRoute",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      store.commit("load/countReset");

      let queryRequest;
      //console.log(to.params);

      /*

      if (
        Object.keys(to.query).length === 0 &&
        to.query.constructor === Object // check if query is empty
      ) {
        queryRequest = to.path.substr(1).split("-");
        console.log("searchRequestRoute IF queryRequest", queryRequest);
      } 
      
      else {
        queryRequest = Object.values(to.query).flat();
        //console.log("else", to.query, queryRequest);
        //queryRequest = to.query;
        console.log("searchRequestRoute ELSE queryRequest", queryRequest);
      } */

      // TO PARSE KEBAB PATH STRING INTO SEARCH QUERY OBJECT
      // BY FINDING KEYS IN LOOCK UP IN STORE
      // THEN PARSING THIS OBJECT INTO FLATTEN QUERY PARAM STRING

      store
        //.dispatch("search/serviceRequestAction", to)
        .dispatch("search/queryParamsObjectAction", to)
        .then(store.commit("search/routeLastBeforeEnterMutation", to.name))
        .then((q) => {
          console.log("getter", store.getters["search/searchQueryStringKebab"]);
          debugger;
          next({
            name: "searchQueryRoute",
            query: q,
          });
        });
    },
  },
  {
    path: "/:slug",
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
