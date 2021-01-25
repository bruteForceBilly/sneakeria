<template>
  <div>
    <div class="pt-8 pb-12">
      <h1 class="text-4xl tracking-tighter font-black uppercase">
        <span
          v-if="currentRoute.name === 'all' && searchFoundProductsLength < 1"
          >All Products</span
        >
        <span
          v-else-if="
            currentRoute.name === 'all' && searchFoundProductsLength > 0
          "
          >All Products
          <span class="font-light tracking-wider text-gray-600 text-xl">
            ( {{ searchFoundProductsLength }} Products )
          </span></span
        >
        <span v-else>
          <span v-if="searchFoundProductsLength > 0">
            {{ displayTitel }}
            <span class="font-light tracking-wider text-gray-600 text-xl">
              ( {{ searchFoundProductsLength }} Products )
            </span>
          </span>
          <span v-else> No Products Found </span>
        </span>
      </h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    searchFoundProductsLength: {
      type: Number,
    },
    currentRoute: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters("search", ["queryParamsObject", "selectedDisplayTitle"]),
    ...mapState(["route"]),
    displayTitel() {
      let res = [
        this.selectedDisplayTitle(this.queryParamsObject.productProp),
        this.selectedDisplayTitle(this.queryParamsObject.versionProp),
      ];

      if (res.length === 2 && res[res.length - 1] === null) {
        return res.flat().toString().replace(/,/g, " ∙ ").slice(0, -3);
      } else {
        return res.flat().toString().replace(/,/g, " ∙ ");
      }
    },
  },
  // created() {
  //   console.log("hello", this.displayTitel);
  // },
};
</script>

<style></style>
