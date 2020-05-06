<template>
  <div>
    <ProductCardSettings
      v-slot:default="{ info, ui, selectHandler, likeHandler }"
    >
      <ProductCardLayout
        v-bind:layout="{ info, ui, selectHandler, likeHandler }"
      >
        <template v-slot:favourite>
          <ProductCardButton
            v-on:click.native="likeHandler"
            icon="heart"
            button-style="link square"
            v-bind:button-state="{ info, ui, selectHandler, likeHandler }"
          >
          </ProductCardButton>
        </template>

        <template
          v-if="info.variants[ui.selectedVariant.sku].flairs[0]"
          v-slot:flair
        >
          {{ info.variants[ui.selectedVariant.sku].flairs[0] }}
        </template>

        <template v-slot:image>
          <img
            class=" w-full object-scale-down"
            :src="info.variants[ui.selectedVariant.sku].image"
          />
        </template>

        <template v-slot:thumbs>
          <ProductCardThumbs v-bind:thumbs="{ info, ui, selectHandler }" />
        </template>

        <template v-slot:details>
          <ProductCardDetails v-bind:details="{ info, ui }" />
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
