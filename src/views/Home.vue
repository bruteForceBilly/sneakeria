<template>
  <div class="home">
    bubba data: {{ data }} bubba products: {{ products }}
    <img alt="Vue logo" src="../assets/logo.png" />
    <hr />
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    data() {
      return this.$store.state.data;
    },
    products() {
      return this.$store.state.products;
    }
  }
};
</script>
