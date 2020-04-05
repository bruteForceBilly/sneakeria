import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CategoryPage from "../views/CategoryPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/search",
    name: "CategoryPage",
    component: CategoryPage,
    beforeEnter: (to, from, next) => {
      let res = Object.values(to.query)
        .toString()
        .replace(/,/g, "-");
      next(`/${res}`);
    }
  },
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
