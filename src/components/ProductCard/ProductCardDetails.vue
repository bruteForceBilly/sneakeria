<template>
  <div>
    <h6 class="text-gray-600 mt-4">{{ details.info.category }}</h6>
    <h3>{{ details.info.title }}</h3>
    <h5>
      <span
        :class="[price.discount ? 'text-red-600' : 'text-black']"
        class="mr-1 text-xl"
      >
        {{ price.offered | formatCurrency(this.price.currency) }}
      </span>
      <span v-if="price.discount" class="line-through text-gray-600 mx-1">
        {{ price.original | formatCurrency(this.price.currency) }}
      </span>
      <span
        v-if="price.discount"
        class="text-gray-600 ml-1 rounded-full text-xs py-1 px-2 bg-gray-200"
      >
        SAVE {{ price.discount }}
      </span>
    </h5>

    <h6 class="text-gray-600 mt-1">
      {{ details.info.variants.length }} Colors
    </h6>
    <p class="text-gray-500 text-xs">
      <!-- {{ details.info.variants[ui.selectedVariant.sku].flair }} -->
      {{ this.variants[this.sku].flairs }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ProductDetails",
  props: {
    details: Object
  },
  computed: {
    sku() {
      return this.details.ui.selectedVariant.sku;
    },
    variants() {
      return this.details.info.variants;
    },
    price() {
      return this.variants[this.sku].price;
    }
  },
  filters: {
    formatCurrency: function(amount, currency) {
      if (currency === "EUR") {
        return "€" + amount; // + parseFloat(price_amount).toFixed(2)
      } else if (currency === "USD") {
        return "$" + amount; // + parseFloat(price_amount).toFixed(2)
      }
    }
  }
};
</script>

<style scoped></style>
