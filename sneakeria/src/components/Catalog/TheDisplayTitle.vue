<template>
  <div>
    <div class="pt-1 sm:pt-5 pb-1">
      <h1
        style="transform: skew(-15deg, 0);"
        class="text-4xl sm:text-5xl tracking-tighter font-normal uppercase"
      >
        <span
          v-if="currentRoute.name === 'all' && searchFoundProductsLength < 1"
          >All Products</span
        >
        <span
          v-else-if="
            currentRoute.name === 'all' && searchFoundProductsLength > 0
          "
          >All Products
          <span
            class="font-extralight tracking-normal text-gray-600 not-italic text-xs"
          >
            [{{ searchFoundProductsLength }}]
          </span></span
        >
        <span v-else>
          <span v-if="searchFoundProductsLength > 0">
            {{ displayTitel }}
            <span
              class="font-extralight tracking-normal text-gray-600 not-italic text-xs"
            >
              [{{ searchFoundProductsLength }}]
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
        return res.flat().toString().replace(/,/g, "∙").slice(0, -1);
      } else {
        return res.flat().toString().replace(/,/g, "∙");
      }
    },
  },
};
</script>

<style></style>
