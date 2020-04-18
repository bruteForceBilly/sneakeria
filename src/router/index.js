/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CategoryPage from "../views/CategoryPage.vue";
import store from "@/store/index.js";
import products from "@/services/products.js";

Vue.use(VueRouter);

const setPropBoolean = function(propValue) {
  return propValue;
};

const routes = [
  {
    path: "/search",
    name: "searchQueryRoute",
    component: Home,
    props: {
      loading: setPropBoolean(false),
      searching: setPropBoolean(true)
    },
    beforeEnter: (to, from, next) => {
      return new Promise((resolve, reject) => {
        if (to.name === "searchRequestRoute") {
          store.dispatch(
            "searchQueryParamsStringAction",
            store.state.searchQueryParamsObject
          );
        } else if (to.name === "searchQueryRoute") {
          store.dispatch("searchQueryParamsStringAction", to.query);
        }
        store.state.searchQueryParamsString === ""
          ? reject()
          : resolve(store.state.searchQueryParamsString);
      })
        .catch(() => {
          throw new Error("Something failed");
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
    component: Home,
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
    component: Home,
    props: {
      loading: setPropBoolean(false),
      searching: setPropBoolean(false)
    }
  },
  {
    path: "/",
    name: "home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
