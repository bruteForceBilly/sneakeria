/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import products from "@/services/products.js";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
import About from "../views/About.vue";
import Cart from "../views/Cart.vue";
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
      store.commit("searchQueryParamsObjectMutation", null);
      store.commit("searchQueryParamsStringMutation", null);
      store.commit("searchQueryParamsKebabMutation", null);
      store.commit("setByRoute", true);
      store.commit("searchFoundProductsMutation", null);
      store.commit("searchRouteLastBeforeEnterMutation", to.name);
      //store.commit("filterBarNoneSelectedMutation", true);
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
        if (store.state.searchRouteLastBeforeEnter === "searchRequestRoute") {
          //console.log("ROUTER IF searchRequestRoute"),
          store.dispatch(
            "searchQueryParamsStringAction",
            store.state.searchQueryParamsObject
          );
        } else if (to.name === "searchQueryRoute") {
          //console.log("ROUTER ELSE IF searchQueryRoute", to.query); // try searchQueryParamsObjectMutation
          store.dispatch("searchQueryParamsStringAction", to.query);
          store.commit("searchQueryParamsObjectMutation", to.query);
        }
        store.state.searchQueryParamsString === ""
          ? reject()
          : resolve(store.state.searchQueryParamsString);
      })
        .catch(err => {
          throw new Error("Something failed", err); // I have no idea why this throws an error when hitting about directly
        })
        .then(searchQueryParamsString => {
          //console.log(
          //  "ROUTER searchQueryParamsString",
          //  searchQueryParamsString
          //);
          products("filter", searchQueryParamsString, 0, 10,  data => {
            //console.log("ROUTER products", data);
            store.commit("searchFoundProductsMutation", data);
          }).then(() => {
            return next({
              name: "searchResultRoute",
              params: { slug: store.state.searchQueryParamsKebab }
            });
          });
        })
        .then(
          store.commit("searchRouteLastBeforeEnterMutation", to.name)
          //console.log("ROUTER searchRouteLastBeforeEnterMutation", to.name)
        );
    }
  },
  {
    path: "/:id",
    name: "searchRequestRoute",
    component: Catalog,
    beforeEnter: (to, from, next) => {
      //console.log("ROUTER searchRequestRoute beforeEnter", to, from);
      store
        .dispatch("searchRequestAction", to.path.substr(1).split("-"))
        .then(store.commit("searchRouteLastBeforeEnterMutation", to.name))
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
      store.commit("searchRouteLastBeforeEnterMutation", to.name);
      next();
    }
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
  {
    path: "/product/:product",
    name: "product",
    component: Product
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL, // I havent set a base url?
  routes
});

export default router;
