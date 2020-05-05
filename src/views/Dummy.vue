<template>
  <div class="h-screen pt-8 px-4 sm:px-6 md:px-12 xl:px-16">
    <h1 class="text-4xl font-black uppercase mb-8">
      Dummy Catalog Page
      <span class="font-light text-gray-600 text-xl">( Millions Products)</span>
    </h1>

    <div class="w-full bg-orange-400">
      <FilterBar></FilterBar>
    </div>
    <div class="mt-40">
      <div>
        <h1>No products selected...</h1>
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
  </div>
</template>

<script>
//import SearchForm from "@/components/SearchForm/SearchForm.vue";
import FilterBar from "@/components/MultiSelects/FilterDropDownMenu/FilterBar.vue";

export default {
  name: "Dummy",
  props: ["q"],
  components: {
    FilterBar
  },
  computed: {
    products() {
      return this.$store.state.searchFoundProducts === undefined
        ? ["ooops!"]
        : this.$store.state.searchFoundProducts;
    },
    searchFoundProductsLength() {
      if (
        this.$store.state.searchFoundProducts === null ||
        this.$store.state.searchFoundProducts.length < 1
      ) {
        return 0;
      } else {
        return this.$store.state.searchFoundProducts.length;
      }
    }
  }
};
</script>

<style lscoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.na-enter {
  opacity: 0;
  transform: translateX(+30%);
}

.na-enter-active {
  transition: opacity 1s ease, transform 1s ease;
}
</style>
