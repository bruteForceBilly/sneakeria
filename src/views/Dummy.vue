<template>
  <div class="mt-16 mx-32">
    <h1 class="font-bold uppercase mb-6">Dummy Catalog Page</h1>
    <div class="h-screen flex flex-wrap content-start justify-start ml-4">
      <div
        v-for="item in products"
        :key="item.productId"
        class="w-1/5 h-56 pt-16 px-4 bg-gray-200 my-4 mx-4 text-left"
      >
        <p>{{ item.productTitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dummy",
  computed: {
    products() {
      return this.$store.state.searchFoundProducts === undefined
        ? ["ooops!"]
        : this.$store.state.searchFoundProducts;
    }
  },
  beforeCreate() {
    console.log(this.$store.state.searchFoundProducts);
  }
};
</script>

<style lang="scss" scoped></style>
