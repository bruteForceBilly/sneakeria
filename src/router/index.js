import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CategoryPage from "../views/CategoryPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/search",
    name: "search",
    component: CategoryPage,
    props: { fromHome: false },
    beforeEnter: (to, from, next) => {
      let res = Object.values(to.query)
        .toString()
        .replace(/,/g, "-");
      next(`/${res}`);
    }
  },
  {
    path: "/:id",
    name: "result", // rename to SearchResult
    component: CategoryPage,
    props: { fromHome: false }
  },
  {
    path: "/:id",
    name: "CategoryHome",
    component: CategoryPage,
    props: { fromHome: true }
  },

  // /:id route that takes string and splits in to query object
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
