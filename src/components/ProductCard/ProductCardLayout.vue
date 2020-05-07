<template>
  <article
    v-on:mouseenter="hover = true"
    v-on:mouseleave="hover = false"
    class="relative w-full bg-white overflow-hidden flex flex-row flex-no-wrap items-stretch justify-center"
  >
    <div class="flex-grow overflow-hidden max-w-half temp-bg">
      <!-- <section
        v-if="layout.info.variants[layout.ui.selectedVariant.sku].flairs[0]"
      > -->
      <section v-if="layout.product.campaigns">
        <span
          class="overflow-visible absolute z-20 top-0 m-4 inline writing-mode-rotate w-full"
        >
          <h4
            class="text-2xl inline bg-yellow-200 tracking-widest uppercase px-1 py-2"
          >
            <slot name="flair"></slot>
          </h4>
        </span>
      </section>

      <section class="mt-2 relative w-full z-20 flex justify-end">
        <slot name="favourite">
          <h1>Favourite Button goes here</h1>
        </slot>
      </section>

      <section class="relative z-10 overflow-hidden">
        <slot name="image">
          <img src="" />
        </slot>
      </section>

      <div
        class="absolute bottom-0 z-50 w-1/2 overflow-hidden"
        :class="[hover ? 'visible' : 'invisible']"
      >
        <slot name="thumbs"> </slot>
      </div>
    </div>
    <div class="flex-grow max-w-half">
      <section class="mx-4 px-2 h-full flex items-center">
        <slot name="details">
          <section class="mx-4 px-2">
            Product Details Component Goes here
          </section>
        </slot>
      </section>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    layout: Object
  },
  data() {
    return {
      hover: false
    };
  }
};
</script>

<style scoped>
.max-w-half {
  max-width: 50%;
}

.temp-bg {
  background-color: rgba(247, 247, 247, 1);
}

.writing-mode-rotate {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
</style>
