<template>
  <div class="home">
    <div v-if="searchIsCompleted">
      <h1>holy moly we are almost there!</h1>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "Home",
  props: ["searchIsCompleted"],
  computed: {
    searchFoundProductsProp() {
      return this.$store.state.searchFoundProducts === undefined
        ? "ooops!"
        : this.$store.state.searchFoundProducts;
    }
  }
};
</script>
