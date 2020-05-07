<template>
  <div v-if="product">
    <ProductCardSettings
      v-bind:product="product"
      v-slot:default="{
        selectHandler,
        likeHandler,
        isSelectedVersionLiked,
        selectedVersion,
        likedVersions
      }"
    >
      <ProductCardLayout
        v-bind:layout="{
          product,
          selectHandler,
          likeHandler,
          isSelectedVersionLiked,
          selectedVersion,
          likedVersions
        }"
      >
        <template v-slot:favourite>
          <ProductCardButton
            v-on:click.native="likeHandler()"
            icon="heart"
            button-style="link square"
            v-bind:state="{
              selectHandler,
              likeHandler,
              isSelectedVersionLiked,
              selectedVersion,
              likedVersions
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
          {{ product.campaigns }}
        </template>

        <template v-slot:image>
          <img class=" w-full object-scale-down" src="@/assets/2.png" />
        </template>

        <template v-slot:thumbs>
          <ProductCardThumbs
            v-bind:thumbs="{
              product,
              selectHandler,
              selectedVersion,
              likedVersions
            }"
          />
        </template>

        <template v-slot:details>
          <ProductCardDetails
            v-bind:details="{ product, selectedVersion, likedVersions }"
          />
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
  props: ["product"],
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
