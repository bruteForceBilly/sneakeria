<template>
  <div class="h-full">
    <div class="w-full h-full flex flex-row flex-wrap items-start">
      <!-- TITLE -->

      <!-- <h6 class="text-gray-600 mt-4 text-vw-xss capitalize whitespace-no-wrap">
        {{ settings.settings.product.productTitle }}
      </h6> -->

      <h3
        class="mt-4 w-full capitalize"
        :class="[
          settings.settings.layout === 'card'
            ? 'text-vw-xs whitespace-no-wrap'
            : 'text-vw-xl',
        ]"
      >
        {{ productTitle }}
      </h3>

      <!-- PRICE -->
      <div
        :class="[
          selectedVersionPrice.discount
            ? 'text-red-600 font-bold'
            : 'text-gray-800',
        ]"
        class="mr-2 flex text-vh-xs"
      >
        <span>
          {{ selectedVersionPrice.amountOffered | formatCurrency("eur") }}
        </span>

        <span
          v-if="selectedVersionPrice.discount"
          class="text-gray-500 font-normal line-through mx-3"
        >
          {{ selectedVersionPrice.amountOriginal | formatCurrency("eur") }}
        </span>
      </div>
      <!-- DISCOUNT -->
      <div v-if="discount">
        <h6
          class="inline rounded-full py-1 px-3 bg-gray-100 text-gray-500 font-medium text-vh-xxs whitespace-no-wrap"
        >
          SAVE {{ discount }}
        </h6>
      </div>

      <!-- COLORS -->
      <h6 class="text-gray-600 self-end text-vw-xxs w-full">
        {{
          productVersionsColors.length > 1
            ? productVersionsColors.length + " Colors"
            : productVersionsColors.length + " Color"
        }}
      </h6>
      <!--
      <h6 class="text-gray-600 mt-1 text-vw-xxs w-full">
        Serial: {{ settings.settings.selectedVersion.id }} |
        {{ settings.settings.product.versions.length }} Colors
      </h6>
      <div class="mt-6 w-full">
        <slot name="buy">... buy button</slot>
      </div>
      -->
    </div>

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
    settings: Object,
  },
  computed: {
    sku() {
      return this.settings.settings.selectedVersion.id;
    },
    product() {
      return this.settings.settings.product;
    },
    productVersions() {
      return this.product.versions;
    },
    productVersionsColors() {
      return this.productVersions.map((version) => version.color);
    },
    selectedVersion() {
      return this.productVersions[this.sku];
    },
    selectedVersionPrice() {
      return this.selectedVersion.price;
    },
    productTitle() {
      return `${this.product.brand} ${this.product.productType}`;
    },
    discount() {
      let percent =
        100 -
        Math.floor(
          (this.selectedVersionPrice.amountOffered /
            this.selectedVersionPrice.amountOriginal) *
            100
        );
      return percent > 0 ? `${percent}%` : false;
    },
  },
  filters: {
    formatCurrency: function (amount, currency) {
      if (currency === "eur") {
        return "€" + amount; // + parseFloat(price_amount).toFixed(2)
      } else if (currency === "usd") {
        return "$" + amount; // + parseFloat(price_amount).toFixed(2)
      }
    },
  },
};
</script>
