/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CategoryPage from "../views/CategoryPage.vue";
import store from "@/store/index.js";
import products from "@/services/products.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/search",
    name: "searchQueryRoute",
    component: Home,
    beforeEnter: (to, from, next) => {
      console.log("guard hit");
      return new Promise((resolve, reject) => {
        console.log("promise enter");

        if (to.name === "searchRequestRoute") {
          console.log("if enter");
          store.dispatch(
            "searchQueryParamsStringAction",
            store.state.searchQueryParamsObject
          );
        } else if (to.name === "searchQueryRoute") {
          console.log("else if enter");
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
          }).then(() =>
            next({
              name: "searchResultRoute",
              params: { slug: store.state.searchQueryParamsKebab }
            })
          );
        });
    }
  },
  {
    path: "/:id",
    name: "searchRequestRoute",
    component: Home,
    beforeEnter: (to, from, next) => {
      store
        .dispatch("searchRequestAction", to.path.substr(1).split("-"))
        .then(q => {
          console.log("hello from searchRequestRoute >>>>", typeof q, q);
          next({ name: "searchQueryRoute", query: q });
        });
    }
  },
  {
    path: "/:slug",
    name: "searchResultRoute",
    component: Home,
    props: { searchIsCompleted: true }
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
