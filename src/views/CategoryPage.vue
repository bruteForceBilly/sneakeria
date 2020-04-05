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
        return this.$route.path;
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
    }
  }
};
</script>
