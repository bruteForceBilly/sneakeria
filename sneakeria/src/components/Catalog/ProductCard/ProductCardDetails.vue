<template>
  <div class="h-full">
    <div class="w-full h-full flex flex-row flex-wrap items-start">
      <!-- TITLE -->

      <!-- <h6 class="text-gray-600 mt-4 text-vw-xss">
        {{ settings.settings.product.productTitle }}
      </h6> -->

      <h3
        class="mt-4 w-full uppercase tracking-widest font-normal"
        :class="[
          settings.settings.layout === 'card'
            ? 'text-vw-xxs whitespace-nowrap'
            : 'text-vw-xl',
        ]"
      >
              {{ productTitle }}

      </h3>

      <div>
      <!-- PRICE -->
      <div
        :class="[
          selectedVersionPrice.discount
            ? 'text-red-600 font-bold'
            : 'text-black',
        ]"
        class="mr-2 flex text-vh-xxs"
      >
        <span>
          {{ selectedVersionPrice.amountOffered | formatCurrency("eur") }}
        </span>
      </div>
      <!-- DISCOUNT -->
      <div v-if="discount">
        <h6
          class="rounded text-gray-600 tracking-widest font-normal text-vh-xxs whitespace-nowrap"
        >
          SAVE {{ discount }}
        </h6>
      </div>

      <!-- COLORS -->
      <h6
        class="text-black tracking-tight mt-8 self-end font-light text-vw-xxs sm:text-vh-xxs w-full"
      >
        {{
          productVersionsColors.length > 1
            ? productVersionsColors.length + " Colors"
            : productVersionsColors.length + " Color"
        }}
      </h6>

      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetails",
  props: {
    settings: Object,
  },
  computed: {
    selectedVersion(){
      return this.settings.settings.selectedVersion
    },
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
      return this.productVersions.filter(
        (version) => version.id === this.sku
      )[0];
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
