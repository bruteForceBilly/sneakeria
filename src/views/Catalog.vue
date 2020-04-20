<template>
  <div class="page">
    <h1>Catalog</h1>
  </div>
</template>

<script>
export default {
  name: "Catalog",
  props: ["loading", "searching"]
  // computed: {
  //   products() {
  //     return this.$store.state.searchFoundProducts === undefined
  //       ? "ooops!"
  //       : this.$store.state.searchFoundProducts;
  //   }
  // }
};
</script>
