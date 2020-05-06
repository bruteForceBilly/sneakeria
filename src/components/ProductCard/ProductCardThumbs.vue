<template>
  <div>
    <div class="relative">
      <ProductCardButton
        @click.native="previous"
        v-if="times > 0"
        icon="chevron-left"
        button-style="secondary sm"
        class="absolute z-20 top-1 left-0 mt-4"
      >
      </ProductCardButton>
      <ProductCardButton
        @click.native="next"
        v-if="times < maxTimes"
        icon="chevron-right"
        button-style="secondary sm"
        class="absolute z-20 top-1 right-0 mt-4"
      ></ProductCardButton>
    </div>
    <div class="relative">
      <div
        style="transition: transform 0.5s ease"
        :style="`transform: translateX(-${this.times}%)`"
      >
        <div class="flex flex-row items-stretch">
          <div
            v-for="(variant, index) in thumbs.info.variants"
            v-bind:key="variant.sku"
            class="flex-none inline-block h-16 w-1/4 bg-gray-300 border-solid border-b-2 border-transparent overflow-hidden hover:border-black"
          >
            <img
              :src="variant.image"
              @mouseover="thumbs.selectHandler(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCardButton from "./ProductCardButton";

export default {
  name: "ProductThumbs",
  props: {
    thumbs: Object
  },
  components: {
    ProductCardButton
  },
  data() {
    return {
      times: 0
    };
  },
  computed: {
    sku() {
      return this.thumbs.ui.selectedVariant.sku;
    },
    variants() {
      return this.thumbs.info.variants;
    },
    maxTimes() {
      return Math.ceil(this.variants.length / 4) * 100 - 100;
    }
  },
  methods: {
    next() {
      return (this.times += 100);
    },
    previous() {
      return (this.times -= 100);
    }
  }
};
</script>

<style scoped></style>
