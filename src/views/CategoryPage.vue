<template>
  <div>
    <p>
      This is Category Page fromeHome: {{ fromHome }} <br />
      search: {{ search }} <br />
    </p>
    <SearchForm
      v-if="navigation.data"
      :selected-options="fromHome ? {} : queryParamsObject"
    ></SearchForm>
    queryParamsSlug: {{ queryParamsSlug }} <br />
    queryParamsObject: {{ queryParamsObject }} <br />
    <strong> queryParamsString: {{ queryParamsString }} </strong>

    <br />
    <br />
    <br />
    {{ products.data }}
  </div>
</template>

<script>
import axios from "axios";
import { API_PRODUCTS } from "@/constants";
import SearchForm from "@/components/SearchForm/SearchForm.vue";

export default {
  name: "CategoryPage",
  components: {
    SearchForm
  },
  props: ["fromHome", "search"],
  data() {
    return {
      queryParamsSlug: "",
      queryParamsString: "",
      queryParamsObject: {},
      products: {
        error: null,
        loading: null,
        data: null
      },
      navigation: {
        error: null,
        loading: null,
        data: null
      }
    };
  },
  created: function() {
    this.fetchNavigation(); // Migrate to beforeRouteEnter guard
  },
  beforeUpdate() {
    if (!this.search) return this.buildRouteQueryParamsObject(); // Migrate to beforeRouteEnter guard
  },
  watch: {
    // refactor, dont control async with watchers
    $route: ["buildRouteQueryParamsObject"],
    queryParamsObject: ["buildRouteQueryParamsString", "buildKebabCaseSlug"],
    queryParamsString: ["fetchProducts"]
  },
  methods: {
    buildRouteQueryParamsObject() {
      // refactor into filter kebabSlugToObjLit
      let that = this;
      let res = {};
      let arr = [];
      let splittedSlug = that.$route.path.substr(1).split("-");
      splittedSlug.forEach(function(searchItem) {
        that.navigation.data.filter(function(obj) {
          if (obj.values.includes(searchItem)) {
            arr.push((res[obj.name] = searchItem));
          }
        });
      });
      if (this.search === false) {
        this.queryParamsObject = res;
      } else {
        return (this.queryParamsObject = this.$route.query);
      }
    },
    buildRouteQueryParamsString() {
      // refactor into filter objLitToQueryParams
      // move to mixin
      let routeQueryString = "";
      for (let [key, value] of Object.entries(this.queryParamsObject)) {
        routeQueryString += `${key}=${value}&`;
      }
      return (this.queryParamsString = routeQueryString.slice(0, -1));
    },
    buildKebabCaseSlug(obj) {
      let result = obj;
      return (this.queryParamsSlug = Object.values(result)
        .toString()
        .replace(/,/g, "-"));
    },
    redirect() {
      let obj = { name: "result", params: { id: this.queryParamsSlug } };
      return this.queryParamsSlug != this.$route.params.id
        ? this.$router.replace(obj)
        : null;
    },
    fetchProducts() {
      // Move into services/http.js
      let that = this;
      this.products.error = this.products.data = null;
      this.products.loading = true;
      axios
        .get(API_PRODUCTS + "?" + this.queryParamsString)
        .then(() => that.redirect())
        .then(response => (this.products.data = response.data))
        .catch(err => (this.products.error = err.toString()))
        .finally(function() {
          that.products.loading = false;
        });
    } /*,
    fetchNavigation() {
      // Move into services/http.js and store in Vuex
      this.navigation.error = this.navigation.data = null;
      this.navigation.loading = true;
      axios
        .get(API_SITE)
        .then(response => (this.navigation.data = response.data))
        .catch(err => (this.navigation.error = err.toString()))
        .finally(() => (this.navigation.loading = false));
    } */
  }
};
</script>
