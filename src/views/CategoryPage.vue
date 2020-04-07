<template>
  <div>
    <p>This is Category Page</p>
    <p>fromHome: {{ fromHome }}</p>
    api nav : {{ navigation.data }}
    <SearchForm
      v-if="navigation.data"
      :selected-options="fromHome ? {} : routeQueryObjectProp"
    ></SearchForm>
  </div>
</template>

<script>
import axios from "axios";
import { API_PRODUCTS, API_SITE } from "@/constants";
import SearchForm from "@/components/SearchForm/SearchForm.vue";

export default {
  name: "CategoryPage",
  components: {
    SearchForm
  },
  props: ["fromHome"],
  data() {
    return {
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
    this.fetchProducts();
    this.fetchNavigation();
  },
  watch: {
    $route: ["fetchProducts"]
  },
  computed: {
    routeQueryObjectProp() {
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
      return res;
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
    fetchProducts() {
      this.products.error = this.products.data = null;
      this.products.loading = true;
      axios
        .get(API_PRODUCTS + "?" + this.buildRouteQueryString)
        .then(response => (this.products.data = response.data))
        .catch(err => (this.products.error = err.toString()))
        .finally(() => (this.products.loading = false));
    },
    fetchNavigation() {
      this.navigation.error = this.navigation.data = null;
      this.navigation.loading = true;
      axios
        .get(API_SITE)
        .then(response => (this.navigation.data = response.data))
        .catch(err => (this.navigation.error = err.toString()))
        .finally(() => (this.navigation.loading = false));
    }
  }
};
</script>
