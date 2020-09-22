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
    component: Home
  },
  {
    path: "/all",
    name: "all",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      store.commit("search/searchQueryParamsObjectMutation", null);
      store.commit("search/searchQueryParamsStringMutation", null);
      store.commit("search/searchQueryParamsKebabMutation", null);
      store.commit("setByRoute", true);
      store.commit("search/searchFoundProductsMutation", null);
      store.commit("search/searchRouteLastBeforeEnterMutation", to.name);
      next();
    }
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
      return new Promise((resolve, reject) => {
        if (
          store.state.search.searchRouteLastBeforeEnter === "searchRequestRoute"
        ) {
          // console.log("ROUTER IF searchRequestRoute"),
          store.dispatch(
            "search/searchQueryParamsStringAction",
            store.state.search.searchQueryParamsObject
          );
        } else if (to.name === "searchQueryRoute") {
          // console.log("ROUTER ELSE IF searchQueryRoute", to.query); // try searchQueryParamsObjectMutation
          store.dispatch("search/searchQueryParamsStringAction", to.query);
          store.commit("search/searchQueryParamsObjectMutation", to.query);
        }
        store.state.search.searchQueryParamsString === ""
          ? reject()
          : resolve(store.state.search.searchQueryParamsString);

        store.dispatch(
          "search/searchQueryParamsStringAction",
          store.state.search.searchQueryParamsObject // check if this object exist?
        );
      })
        .catch(err => {
          throw new Error("Something failed", err); // I have no idea why this throws an error when hitting about directly
        })
        .then(searchQueryParamsString => {
          // console.log(
          //   "ROUTER searchQueryParamsString",
          //   searchQueryParamsString
          // );
          products("filter", searchQueryParamsString, data => {
            //console.log("ROUTER products", data);
            store.commit("search/searchFoundProductsMutation", data);
          }).then(() => {
            return next({
              name: "searchResultRoute",
              params: { slug: store.state.search.searchQueryParamsKebab }
            });
          });
        })
        .then(
          store.commit("search/searchRouteLastBeforeEnterMutation", to.name)
          // console.log("ROUTER searchRouteLastBeforeEnterMutation", to.name)
        );
    }
  },
  {
    path: "/:id",
    name: "searchRequestRoute",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      // console.log("ROUTER searchRequestRoute beforeEnter", to, from);
      store.commit("load/countReset");
      store
        .dispatch("search/searchRequestAction", to.path.substr(1).split("-"))
        .then(
          store.commit("search/searchRouteLastBeforeEnterMutation", to.name)
        )
        .then(q => {
          next({ name: "searchQueryRoute", query: q });
        });
    }
  },
  {
    path: "/:slug",
    name: "searchResultRoute",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      // console.log("LOOOK searchResultRoute", 'to >>>', to, 'from >>>>', from)
      store.commit("search/searchRouteLastBeforeEnterMutation", to.name);
      next();
    }
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
    component: Product
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL, // I havent set a base url?
  routes
});

export default router;
