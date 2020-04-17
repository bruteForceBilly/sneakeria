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
    path: "/:id",
    name: "searchRequestRoute",
    component: Home,
    beforeEnter: (to, from, next) => {
      store.commit("searchRequestSlugMutation", to.path.substr(1));
      store
        .dispatch("searchRequestAction", to.path.substr(1).split("-"))
        .then(q => {
          console.log("hello from searchRequestRoute >>>>", typeof q, q);
          next({ name: "searchQueryRoute", query: q });
        });
    }
  },
  {
    path: "/search",
    name: "searchQueryRoute",
    component: Home,
    beforeEnter: (to, from, next) => {
      // Refactor so that the searchQueryParamsString getter takes to.query
      // as an argument and the getter does an check to see
      // if searchQueryParamsObject is empty
      // is so we must build and commit a new one
      //
      // Why the heck does the route not redirect to result?
      // AH! because searchRequestSlugString is not set
      // So we need a getter that parses query params into a kebab slug
      //
      // God damn it this is getting hary. You need to draw this out man.
      //
      // Basically do a if check if from.name is searchRequestRoute
      products(
        from.matched.length < 1
          ? "section=men&brand=adidas"
          : store.getters.searchQueryParamsString,
        data => {
          console.log(data);
          store.commit("searchFoundProductsMutation", data);
        }
      ).then(() => {
        return next({
          name: "searchResultRoute",
          params: { slug: store.state.searchRequestSlugString }
        });
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
