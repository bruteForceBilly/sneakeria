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
      <article
        v-for="wish in wishedProducts"
        :key="wish.id"
        class="flex w-full h-20 m-6"
      >
        <img
          src="@/assets/2.png"
          class="h-full hover:opacity-50"
          @click="likeHandler(wish.id, wish.productId)"
        />
        <div class="pl-4">
          <ul>
            <li class="capitalize text-lg">
              {{ wish.product.brand }} {{ wish.product.productType }}
            </li>

            <li class="text-sm tracking-wide">
              €{{ wish.price.amountOffered }}
            </li>
            <li class="capitalize text-xs mt-1 font-light">
              {{ wish.color }}
            </li>
          </ul>
        </div>
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
  methods: {
    likeHandler(productId, versionId) {
      this.$store.commit("wishlist/removeWishedProduct", {
        "productId": productId,
        "versionId": versionId,
      });
    },
  },
  beforeCreate() {
    this.$store.dispatch("wishlist/getWishedProducts");
  },
};
</script>
