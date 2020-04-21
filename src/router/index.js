/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import products from "@/services/products.js";
import OldCategoryPage from "../views/OldCategoryPage.vue";
import App from "@/App.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Cart from "../views/Cart.vue";
import Catalog from "../views/Catalog.vue";
import siteMap from "@/services/siteMap.js";
import axios from "axios";
import { API_SITE } from "@/constants";

Vue.use(VueRouter);

const setPropBoolean = function(propValue) {
  return propValue;
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/catalog", // will be refactor later to handle search
    name: "catalog",
    component: Catalog
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
  {
    path: "/search",
    name: "searchQueryRoute",
    component: OldCategoryPage,
    props: {
      loading: setPropBoolean(false),
      searching: setPropBoolean(true)
    },
    beforeEnter: (to, from, next) => {
      return new Promise((resolve, reject) => {
        if (to.name === "searchRequestRoute") {
          store.dispatch(
            "searchQueryParamsStringAction",
            store.state.searchQueryPara2msObject
          );
        } else if (to.name === "searchQueryRoute") {
          store.dispatch("searchQueryParamsStringAction", to.query);
        }
        store.state.searchQueryParamsString === ""
          ? reject()
          : resolve(store.state.searchQueryParamsString);
      })
        .catch(err => {
          throw new Error("Something failed", err); // I have no idea why this throws an error when hitting about directly
        })
        .then(searchQueryParamsString => {
          products(searchQueryParamsString, data => {
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
    component: OldCategoryPage,
    props: {
      loading: setPropBoolean(false),
      searching: setPropBoolean(true)
    },
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
    component: OldCategoryPage,
    props: {
      loading: setPropBoolean(false),
      searching: setPropBoolean(false)
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL, // I havent set a base url?
  routes
});

router.beforeEach((to, from, next) => {
  //return store.dispatch("siteMapDataAction");
  store.dispatch({
    type: "siteMapAction",
    data: null,
    loading: true,
    error: null
  });
  return axios
    .get(API_SITE)
    .then(response =>
      store.dispatch({
        type: "siteMapAction",
        data: response.data,
        loading: false,
        error: null
      })
    )
    .catch(err =>
      store.dispatch({
        type: "siteMapAction",
        data: err.toString(),
        loading: false,
        error: true
      })
    );
});

export default router;
