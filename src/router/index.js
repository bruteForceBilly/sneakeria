/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import products from "@/services/products.js";
// import OldCategoryPage from "../views/OldCategoryPage.vue";
// import App from "@/App.vue";
import Home from "../views/Home.vue";
import Dummy from "../views/Dummy.vue";
import About from "../views/About.vue";
import Cart from "../views/Cart.vue";
// import Catalog from "../views/Catalog.vue";
// import siteMap from "@/services/siteMap.js";
// import axios from "axios";
// import { API_SITE } from "@/constants";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/search",
    name: "searchQueryRoute",
    component: Dummy,
    beforeEnter: (to, from, next) => {
      return new Promise((resolve, reject) => {
        if (to.name === "searchRequestRoute") {
          store.dispatch(
            "searchQueryParamsStringAction",
            store.state.searchQueryParamsObject
          );
        } else if (to.name === "searchQueryRoute") {
          console.log("ROUTER searchQueryRoute", to.query); // try searchQueryParamsObjectMutation
          store.dispatch("searchQueryParamsStringAction", to.query);
          store.commit("searchQueryParamsObjectMutation", to.query);
          store.dispatch("searchQueryParamsKebabAction", to.query);
        }
        console.log(
          "ROUTER searchQueryParamsString",
          store.state.searchQueryParamsString
        );
        store.state.searchQueryParamsString === ""
          ? reject()
          : resolve(store.state.searchQueryParamsString);
      })
        .catch(err => {
          throw new Error("Something failed", err); // I have no idea why this throws an error when hitting about directly
        })
        .then(searchQueryParamsString => {
          console.log(
            "ROUTER searchQueryParamsString",
            searchQueryParamsString
          );
          products(searchQueryParamsString, data => {
            console.log("ROUTER products", data);
            store.commit("searchFoundProductsMutation", data);
          }).then(() => {
            return next({
              name: "searchResultRoute",
              params: { slug: store.state.searchQueryParamsKebab }
            });
          });
        });
    }
  },
  {
    path: "/:id",
    name: "searchRequestRoute",
    component: Dummy,
    beforeEnter: (to, from, next) => {
      store
        .dispatch("searchRequestAction", to.path.substr(1).split("-"))
        .then(q => {
          next({ name: "searchQueryRoute", query: q });
        });
    }
  },
  {
    path: "/:slug",
    name: "searchResultRoute",
    component: Dummy,
    props: () => ({
      q: store.state.searchQueryParamsObject
    }),
    beforeEnter: (to, from, next) => {
      console.log(
        "ROUTER searchResultRoute",
        to,
        "ROUTER searchResultRoute store.state.searchQueryParamsObject",
        store.state.searchQueryParamsObject
      );
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL, // I havent set a base url?
  routes
});

export default router;
