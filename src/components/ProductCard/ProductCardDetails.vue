<template>
  <div class="text-3xl w-full">
    <h6 class="text-gray-600 mt-4 capitalize">
      {{ details.product.productTitle }}
    </h6>
    <h3 class="text-6xl ">{{ details.product.name }}</h3>
    <div class="h-16 flex justify-start items-center">
      <div
        :class="[price.discount ? 'text-red-600' : 'text-black']"
        class="mr-2 text-4xl"
      >
        <h5>{{ price.offeredAmount | formatCurrency(this.price.currency) }}</h5>
      </div>
      <div v-if="price.discount" class="text-gray-600">
        <div class="line-through mx-3 text-2xl">
          <h5>
            {{ price.originalAmount | formatCurrency(this.price.currency) }}
          </h5>
        </div>
      </div>

      <div
        class="rounded-full py-2 px-3 bg-gray-100 text-gray-500 text-sm font-black"
      >
        <h6>SAVE {{ discount }}</h6>
      </div>
    </div>

    <h6 class="text-gray-600 mt-1 text-2xl">
      {{ details.product.versions.length }} Colors
    </h6>

    <!--<p class="text-gray-500">
       {{ details.info.variants[ui.selectedVariant.sku].flair }}
      {{ this.variants[this.sku].flairs }}
    </p>  -->
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
      return this.details.selectedVersion.versionId;
    },
    versions() {
      return this.details.product.versions;
    },
    price() {
      return this.versions[this.sku].price;
    },
    discount() {
      let percent =
        100 -
        Math.floor(
          (this.price.offeredAmount / this.price.originalAmount) * 100
        );
      return percent < 100 ? `${percent}%` : false;
    }
  },
  filters: {
    formatCurrency: function(amount, currency) {
      if (currency === "eur") {
        return "€" + amount; // + parseFloat(price_amount).toFixed(2)
      } else if (currency === "usd") {
        return "$" + amount; // + parseFloat(price_amount).toFixed(2)
      }
    }
  }
};
</script>
