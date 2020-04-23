<template>
  <div class="h-screen pt-4 px-4 sm:px-6 md:px-12 xl:px-16">
    <h1 class="font-bold uppercase mb-8">
      Dummy Catalog Page
      <span class="font-light text-gray-600 text-xs">( 767 Products )</span>
    </h1>
    <div class="w-full bg-orange-400 mb-6">
      <SearchForm
        :selected-options="fromHome ? {} : queryParamsObject"
      ></SearchForm>
    </div>
    <div class="grid gap-6">
      <div
        v-for="item in products"
        :key="item.productId"
        class="pt-16 px-4 text-left bg-orange-300"
      >
        <p>{{ item.productTitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm/SearchForm.vue";
export default {
  name: "Dummy",
  components: {
    SearchForm
  },
  computed: {
    products() {
      return this.$store.state.searchFoundProducts === undefined
        ? ["ooops!"]
        : this.$store.state.searchFoundProducts;
    },
    queryParamsObject() {
      return this.$store.getters.searchQueryParamsObject;
    }
  },
  beforeCreate() {
    console.log(this.$store.state.searchFoundProducts, this.queryParamsObject);
  }
};
</script>

<style lscoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
</style>
