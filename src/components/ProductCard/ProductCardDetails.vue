<template>
  <div class="text-xs w-full">
    <h6 class="text-gray-600 mt-4 capitalize">
      {{ settings.settings.product.productTitle }}
    </h6>
    <h3 class="text-3xl ">{{ settings.settings.product.name }}</h3>
    <div class="h-16 flex justify-start items-center">
      <div
        :class="[price.discount ? 'text-red-600' : 'text-black']"
        class="mr-2 text-xl"
      >
        <h5>{{ price.offeredAmount | formatCurrency(this.price.currency) }}</h5>
      </div>
      <div v-if="price.discount" class="text-gray-600">
        <div class="line-through mx-3 text-xl">
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
      {{ settings.settings.product.versions.length }} Colors
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
    settings: Object
  },
  computed: {
    sku() {
      return this.settings.settings.selectedVersion.versionId;
    },
    productVersions() {
      return this.settings.settings.product.versions;
    },
    price() {
      return this.productVersions[this.sku].price;
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
