<template>
  <div
    class="px-3 pb-24 sm:pb-64 sm:px-8 lg:px-24 xl:px-8"
    style="padding-top: 50px"
  >
    <div class="pt-1 sm:pt-5 pb-3">
      <h1 class="text-2xl sm:text-3xl font-black uppercase">My wishlist</h1>
      <h2 class="uppercase mt-4">{{ wishedProducts.length }} products</h2>
    </div>
    <div class="flex flex-row flex-wrap">
      <article
        v-for="wish in wishedProducts"
        :key="wish.id"
        class="w-1/2 box-border border-4 border-white md:w-1/4 md:m-8"
      >
        <div class="flex flex-col">
          <div class="w-full relative">
            <AppIcon
              class="absolute top-5 inline-block z-10 float-right -mb-1 mr-3"
              name="Remove Wish"
              :stroke-width="2"
              :width="15"
              :height="15"
              :isFilled="true"
              @click.native="
                likeHandler({
                  'productId': wish.productId,
                  'versionId': wish.id,
                })
              "
            >
              <IconWish class="inline" />
            </AppIcon>
            <img src="@/assets/2.png" class="w-full" />
          </div>

          <div class="w-full pl-1 pt-2 pb-4">
            <ul>
              <li class="capitalize text-sm md:text-base whitespace-nowrap">
                {{ wish.product.brand }} {{ wish.product.productType }}
              </li>

              <li class="text-sm tracking-wide">
                €{{ wish.price.amountOffered }}
              </li>
              <li class="capitalize text-xxs my-1 font-light">
                {{ wish.color }}
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppIcon from "@/components/App/Base/AppIcon.vue";
import IconWish from "@/components/App/Base/IconWish.vue";

export default {
  name: "Product",

  components: {
    AppIcon,
    IconWish,
  },

  computed: {
    ...mapState("wishlist", ["wishedProducts"]),
  },
  methods: {
    likeHandler(ids) {
      this.$store.dispatch("wishlist/toggleWish", ids);
    },
  },
  beforeCreate() {
    this.$store.dispatch("wishlist/getWishedProducts");
  },
};
</script>
