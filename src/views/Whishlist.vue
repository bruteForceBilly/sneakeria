<template>
  <div
    class="px-1 pb-24 sm:pb-64 sm:px-8 lg:px-24 xl:px-8"
    style="padding-top: 50px"
  >
    <ProductCard
      v-if="false"
      :product-data="product"
      view-context="product"
    ></ProductCard>
  </div>
</template>

<script>
import ProductCard from "@/components/Catalog/ProductCard/ProductCardBase.vue";

export default {
  name: "Product",
  components: {
    ProductCard,
  },
  data() {
    return {
      product: null,
    };
  },
};
</script>
