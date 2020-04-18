<template>
  <div class="home">
    <hr />
    <div v-if="loading === true">
      <h1>... products is loading</h1>
    </div>
    <div v-else>
      <ul>
        <li v-for="(product, index) in products" :key="index">
          {{ product.productTitle }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: ["loading", "searching"],
  computed: {
    products() {
      return this.$store.state.searchFoundProducts === undefined
        ? "ooops!"
        : this.$store.state.searchFoundProducts;
    }
  }
};
</script>
