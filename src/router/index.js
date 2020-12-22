/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import products from "@/services/products.js";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
import Product from "../views/Product.vue";

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
      //   "to query >>",
      //   to.query,
      //   "from >>>",
      //   from
      // );

      return new Promise((resolve, reject) => {
        if (
          store.state.search.searchRouteLastBeforeEnter === "searchRequestRoute"
        ) {
          //console.log("ROUTER IF searchRequestRoute", to, from),
          store.dispatch(
            "search/queryParamsStringAction",
            store.state.search.queryParamsObject
          );
        } else if (to.name === "searchQueryRoute") {
          //console.log("ROUTER ELSE IF searchQueryRoute", to.query); // try searchQueryParamsObjectMutation
          //store.dispatch("search/queryParamsStringAction", to.query);
          //store.commit("search/queryParamsObjectMutation", to.query);
          store.dispatch("search/queryParamsStringAction", to.query);
          store.commit("search/queryParamsObjectMutation", to.query);
        }

        store.state.search.queryParamsString === ""
          ? reject()
          : resolve(store.state.search.queryParamsString);

        store.dispatch(
          "search/queryParamsStringAction",
          store.state.search.queryParamsObject // check if this object exist?
        );
      })
        .catch((err) => {
          throw new Error("Something failed", err); // I have no idea why this throws an error when hitting about directly
        })
        .then((searchQueryParamsString) => {
          //     /// THIS IS WHERE WE NEED TO FIGURE OUT
          //     // HOW TO SPLIT THE API REQUEST PER OBJECT KEY IN QUERY PARAMS OBJECT
          //     // IN FOUND PROUDCTS YOU NEED TO FILTER OUT DUPLICATE PRODUCTS BY ID'S

          //     // IF PROD KEY, THEN FETCH PROD AND FILTER FOUND PROD AFTER COLOR

          //     // IF NO PROD KEY THEN FETCH VERSION

          //     // filter and get sets of product id spans to use for versions? or do in router maybe?

          // console.log(
          //   "ROUTER searchQueryParamsString",
          //   searchQueryParamsString
          // );

          products("filter", searchQueryParamsString, (data) => {
            //console.log("ROUTER products", data);
            store.commit("search/foundProductsMutation", data);
          }).then(() => {
            return next({
              name: "searchResultRoute",
              params: { slug: store.state.search.queryParamsKebab },
            });
          });
        })
        .then(
          store.commit("search/routeLastBeforeEnterMutation", to.name)
          //console.log("ROUTER searchRouteLastBeforeEnterMutation", to.name)
        );
    },
  },
  {
    path: "/:id?",
    name: "searchRequestRoute",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      store.commit("load/countReset");
      let queryRequest;
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

      queryRequest = to.path.substr(1).split("-");

      store
        .dispatch("search/serviceRequestAction", queryRequest)

        .then(store.commit("search/routeLastBeforeEnterMutation", to.name))
        .then((q) => {
          console.log("searchRequestRoute then q", q);
          next({
            name: "searchQueryRoute",
            query: q,
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
      store.commit("search/routeLastBeforeEnterMutation", to.name);
      next();
    },
  },
  // {
  //   path: "/about",.catch(err => {
  //     throw new Error("Something failed", err); // I have no idea why this throws an error when hitting about directly
  //   })
  //   name: "about",
  //   component: About
  // },
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
