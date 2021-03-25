<template>
  <div v-if="productData">
    <ProductCardSettings
      :product-data="productData"
      :sort-setting="sortSetting"
      :view-context="viewContext"
      v-slot:default="{
        settings,
      }"
    >
      <ProductCardLayout
        :settings="{
          settings,
        }"
      >
        <template v-slot:favourite>
          <ProductCardButton
            icon="heart"
            button-style="link square"
            :settings="{
              settings,
            }"
          >
          </ProductCardButton>
        </template>

        <template v-slot:flair>
          <span
            class="py-1"
            v-for="(campaign, i) in productData.campaigns"
            :key="campaign + i"
          >
            {{ campaign }}
          </span>
        </template>

        <template v-slot:thumbs>
          <ProductCardThumbs
            v-bind:settings="{
              settings,
            }"
          />
        </template>

        <template v-slot:details>
          <ProductCardDetails v-bind:settings="{ settings }" />
        </template>
      </ProductCardLayout>
    </ProductCardSettings>
  </div>
</template>

<script>
import ProductCardSettings from "./ProductCardSettings";
import ProductCardLayout from "./ProductCardLayout";
import ProductCardDetails from "./ProductCardDetails";
import ProductCardThumbs from "./ProductCardThumbs";
import ProductCardButton from "./ProductCardButton";

export default {
  name: "ProductBase",
  props: ["productData", "viewContext", "sortSetting"],
  components: {
    ProductCardSettings,
    ProductCardLayout,
    ProductCardDetails,
    ProductCardThumbs,
    ProductCardButton,
  },
};
</script>

<style scoped>
.max-h-half {
  max-height: 50%;
}
</style>
