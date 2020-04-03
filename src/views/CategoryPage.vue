<template>
  <div>
    <h1>This is Category Page {{ buildRouteQueryString }}</h1>
    <br />
    <SearchForm></SearchForm>
    {{ products }}
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
  },
  watch: {
    $route: "fetchData"
  },
  computed: {
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
    }
  }
};
</script>
