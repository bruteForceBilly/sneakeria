<template>
  <div>
    <p>This is Category Page {{ getSelectedOptions }}</p>
    <SearchForm :selected-options="getSelectedOptions"></SearchForm>
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
  data() {
    return {
      loading: false,
      products: null,
      error: null
    };
  },
  created() {
    this.fetchData();
    console.log(">>> path", this.$route.path);
    console.log(">>> pathToObj", this.pathToObject(this.$route.path));
  },
  watch: {
    $route: "fetchData"
  },
  computed: {
    getSelectedOptions() {
      if (
        Object.keys(this.$route.query).length === 0 &&
        this.$route.query.constructor === Object
      ) {
        return this.slugToObject(this.$route.path, [
          "section",
          "campaigns",
          "category",
          "look",
          "brand"
        ]);
      } else {
        return this.$route.query;
      }
    },
    buildRouteQueryString() {
      let routeQueryString = "";
      for (let [key, value] of Object.entries(this.$route.query)) {
        routeQueryString += `${key}=${value}&`;
      }
      return routeQueryString.slice(0, -1);
    }
  },
  methods: {
    fetchData() {
      this.error = this.products = null;
      this.loading = true;
      axios
        .get(API_PRODUCTS + "?" + this.buildRouteQueryString)
        .then(response => (this.products = response))
        .catch(err => (this.error = err.toString()))
        .finally(() => (this.loading = false));
    },
    pathToObject(queryString) {
      function sort(arr, arg) {
        return arr.filter(function(cv, i) {
          if (i % 2 === arg) return cv;
        });
      }
      let result = {};
      let odd = sort(queryString.substr(1).split("-"), 0);
      let even = sort(queryString.substr(1).split("-"), 1);
      odd.forEach(function(cv, i) {
        result[cv] = even[i];
      });
      return result;
    },
    slugToObject(slug, keys) {
      let querySchemaObj = {};
      let slicedKeys = keys.slice(0, slug.substr(1).split("-").length);
      slicedKeys.forEach(function(key, i) {
        return (querySchemaObj[key] = slug.substr(1).split("-")[i]);
      });
      return querySchemaObj;
    }
  }
};
</script>
