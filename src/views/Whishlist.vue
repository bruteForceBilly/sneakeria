<template>
  <div
    class="px-3 pb-24 sm:pb-64 sm:px-8 lg:px-24 xl:px-8"
    style="padding-top: 50px"
  >
    <div class="pt-1 sm:pt-5 pb-1">
      <h1 class="text-2xl sm:text-3xl font-black uppercase">My wishlist</h1>
      <h2 class="uppercase mt-4">{{ wishedProducts.length }} products</h2>
    </div>
    <div>
      <article v-for="wish in wishedProducts" :key="wish.id">
        <pre>{{ wish }}</pre>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Product",

  computed: {
    ...mapState("wishlist", ["wishedProducts"]),
  },
  created() {
    this.$store.dispatch("wishlist/getWishedProducts");
  },
};
</script>
