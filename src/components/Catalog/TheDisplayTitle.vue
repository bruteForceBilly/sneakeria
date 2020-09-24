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
            {{ currentRoute.path | displayPath }}
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
export default {
  props: {
    searchFoundProductsLength: {
      type: Number,
    },
    currentRoute: {
      type: Object,
    },
  },
  filters: {
    displayPath: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.replace(/[-]/g, " ∙ ").substr(1);
    },
  },
};
</script>

<style></style>
