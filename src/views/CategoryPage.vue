<template>
  <div>
    <h1>This is Category Page</h1>
    {{ products }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryPage",
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
  methods: {
    fetchData() {
      this.error = this.products = null;
      this.loading = true;
      // Create vars for building route in axios get req
      // Iterate and map route query params so you can build a get request
      // with as many query params as possible
      axios
        .get(
          `http://localhost:3000/api/products?${
            Object.keys(this.$route.query)[0]
          }=${Object.values(this.$route.query)[0]}`
        )
        .then(response => (this.products = response))
        .catch(err => (this.error = err.toString()))
        .finally(() => (this.loading = false));
    }
  }
};
</script>
