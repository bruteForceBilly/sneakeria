<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ products }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "About",
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
