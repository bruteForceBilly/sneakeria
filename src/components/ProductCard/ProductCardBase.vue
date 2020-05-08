<template>
  <div v-if="productData">
    <ProductCardSettings
      :product-data="productData"
      :view-context="viewContext"
      v-slot:default="{
        settings
      }"
    >
      <ProductCardLayout
        :settings="{
          settings
        }"
      >
        <template v-slot:favourite>
          <ProductCardButton
            v-on:click.native="settings.likeHandler()"
            icon="heart"
            button-style="link square"
            :settings="{
              settings
            }"
          >
          </ProductCardButton>
        </template>

        <!-- ISSUE #3 
        <template
          v-if="product.version[ui.selectedVariant.sku].flairs[0]"
          v-slot:flair
        >
          {{ info.variants[ui.selectedVariant.sku].flairs[0] }}
        </template> -->

        <template v-slot:flair>
          {{ productData.campaigns }}
        </template>

        <!--<template v-slot:image>
          <img class="" src="@/assets/2.png" />
        </template> -->

        <template v-slot:thumbs>
          <ProductCardThumbs
            v-bind:settings="{
              settings
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
  props: ["productData", "viewContext"],
  components: {
    ProductCardSettings,
    ProductCardLayout,
    ProductCardDetails,
    ProductCardThumbs,
    ProductCardButton
  }
};
</script>

<style scoped>
.max-h-half {
  max-height: 50%;
}
</style>
