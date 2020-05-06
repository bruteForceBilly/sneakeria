<template>
  <div>
    <ProductCard></ProductCard>
  </div>
</template>

<script>
import products from "@/services/products.js";
import ProductCard from "@/components/ProductCard/ProductCardBase.vue";

export default {
  name: "Product",
  components: {
    ProductCard
  },
  data() {
    return {
      product: null
    };
  },
  mounted() {
    products("route", this.$store.state.route.params.product, data => {
      console.log(data);
      return (this.product = data);
    });
  }
};
</script>

<style scoped></style>
