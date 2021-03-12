<template>
  <div
    class="px-3 pb-24 sm:pb-64 sm:px-8 lg:px-24 xl:px-8"
    style="padding-top: 50px"
  >
    <div class="pt-1 sm:pt-5 pb-1">
      <h1 class="text-2xl sm:text-3xl font-black uppercase">Min Önskelista</h1>
      <h2 class="uppercase mt-4">6 varor</h2>
    </div>

    <ProductCard
      v-for="product in wishedProducts"
      :product-data="product"
      :key="'product-' + product.id"
      view-context="catalog"
    ></ProductCard>
  </div>
</template>

<script>
import ProductCard from "@/components/Catalog/ProductCard/ProductCardBase.vue";
import { mapState } from "vuex";

export default {
  name: "Product",
  components: {
    ProductCard,
  },
  computed: {
    ...mapState("wishlist", ["wishedProducts"]),
  },
  created() {
    this.$store.dispatch("wishlist/getWishedProducts");
  },
};
</script>
