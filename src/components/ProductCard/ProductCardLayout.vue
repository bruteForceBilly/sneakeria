<template>
  <article
    v-on:mouseenter="hover = true"
    v-on:mouseleave="hover = false"
    class="relative w-full bg-white border border-white hover:border-black overflow-hidden flex flex-row flex-no-wrap items-stretch justify-center"
  >
    <div class="flex-grow overflow-hidden max-w-half">
      <section
        v-if="layout.info.variants[layout.ui.selectedVariant.sku].flairs[0]"
      >
        <span
          class="overflow-visible absolute z-20 top-0 m-4 inline writing-mode-rotate w-full"
        >
          <h4 class="inline bg-yellow-200 tracking-widest uppercase px-1 py-2">
            <slot name="flair"></slot>
          </h4>
        </span>
      </section>

      <section class="mt-2 absolute z-50 right-0">
        <slot name="favourite">
          <h1>Favourite Button goes here</h1>
        </slot>
      </section>

      <section>
        <div class="relative z-10 overflow-hidden">
          <slot name="image">
            <img src="" />
          </slot>
        </div>
      </section>
      <!--
      <section v-show="hover" class="absolute bottom-0 z-50">
        <slot name="thumbs"> </slot>
      </section> -->
    </div>
    <div class="flex-grow max-w-half bg-orange-200">
      <section class="mx-4 px-2">
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

.writing-mode-rotate {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
</style>
