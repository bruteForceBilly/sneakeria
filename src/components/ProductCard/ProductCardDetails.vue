<template>
  <div class="w-full">
    <h6 class="text-gray-600 text-vw-xs mt-4 capitalize whitespace-no-wrap">
      {{ settings.settings.product.productTitle }}
    </h6>
    <h3 class="text-vw-base">{{ settings.settings.product.name }}</h3>
    <div class="h-16 flex justify-start items-center">
      <div
        :class="[price.discount ? 'text-red-600' : 'text-black']"
        class="mr-2 text-vw-lg"
      >
        <h5>{{ price.offeredAmount | formatCurrency(this.price.currency) }}</h5>
      </div>
      <div v-if="price.discount" class="text-gray-600">
        <div class="line-through mx-3 text-base">
          <h5>
            {{ price.originalAmount | formatCurrency(this.price.currency) }}
          </h5>
        </div>
      </div>

      <div
        class="rounded-full text-xs py-2 px-3 bg-gray-100 text-gray-500 font-black whitespace-no-wrap"
      >
        <h6 class="">SAVE {{ discount }}</h6>
      </div>
    </div>

    <h6 class="text-gray-600 mt-1 text-vw-xxs">
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
