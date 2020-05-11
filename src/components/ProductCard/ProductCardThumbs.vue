<template>
  <div>
    <div class="relative">
      <ProductCardButton
        @mouseover.native="previous"
        v-if="times > 0"
        icon="chevron-left"
        button-style="secondary sm"
        class="absolute z-20 top-1 left-0 mt-6"
      >
      </ProductCardButton>
      <ProductCardButton
        @mouseover.native="next"
        v-if="times < maxTimes"
        icon="chevron-right"
        button-style="secondary sm"
        class="absolute z-20 top-1 right-0 mt-6"
      ></ProductCardButton>
    </div>
    <div class="relative">
      <div
        style="transition: transform 0.5s ease"
        :style="`transform: translateX(-${this.times}%)`"
      >
        <div class="flex flex-row items-stretch">
          <div
            v-for="(version, index) in this.productVersions"
            v-bind:key="version.versionId"
            class="flex-none opacity-50 hover:opacity-100 inline-block pb-2 h-16 w-1/4 temp-bg border-solid border-b-2 border-transparent overflow-hidden hover:border-black"
          >
            <img
              class="h-full object-contain mx-auto"
              src="@/assets/2.png"
              @mouseover="
                [
                  settings.settings.viewContext === 'product'
                    ? settings.settings.versionLinkQueryHandler(
                        settings.settings.selectHandler(index)
                      )
                    : settings.settings.selectHandler(index)
                ]
              "
            />
            <!-- bind :src later to product -->
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
    settings: Object
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
      return this.settings.settings.selectedVariant.versionId;
    },
    productVersions() {
      return this.settings.settings.product.versions; // RENAME PROP FROM SETTINGS TO SOMETHING ELSE
    },
    maxTimes() {
      return (
        Math.ceil(this.settings.settings.product.versions.length / 4) * 100 -
        100
      );
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

<style scoped>
.temp-bg {
  background-color: rgba(247, 247, 247, 1);
}
</style>
