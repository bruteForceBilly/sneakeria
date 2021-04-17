<template>
  <article
    v-on-clickaway="away"
    class="relative z-0 hover:z-30 flex flex-col bg-white"
    v-on:mouseenter="hover = true"
    v-on:mouseleave="hover = false"
  >
    <div
      class="hover:absolute hover:z-50 border border-transparent hover:border-black"
    >
      <div class="">
        <section class="relative z-10 h-full overflow-hidden temp-bg">
          <div v-if="settings.settings.product.campaigns.length !== 0">
            <span
              class="overflow-visible absolute m-4 z-20 left-0 top-0 inline writing-mode-rotate"
            >
              <h4
                class="text-xxs md:text-vh-xxs lg:text-vh-tiny xl:text-vh-xs inline bg-white tracking-widest font-normal italic uppercase px-1 py-2"
              >
                <slot name="flair"></slot>
              </h4>
            </span>
          </div>

          <div class="mt-2 relative w-full z-20 flex justify-end">
            <slot name="favourite">
              <h1>Favourite Button goes here</h1>
            </slot>
          </div>

          <div>
            <div class="flex justify-center h-full">
              <div class="flex-grow">
                <slot name="image">
                  <img src="@/assets/2.png" />
                </slot>
              </div>
            </div>
          </div>
          <div
            class="z-50 overflow-hidden w-full relative bottom-0"
            :class="[hover ? 'block' : 'hidden']"
          >
            <slot name="thumbs"> </slot>
          </div>
        </section>
      </div>

      <div class="w-full bg-white pb-6">
        <section class="px-2 h-full">
          <slot name="details">
            <section class="px-2">Product Details Component Goes here</section>
          </slot>
        </section>
      </div>
    </div>
  </article>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  props: {
    settings: Object,
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    layout() {
      return this.settings.settings.layout;
    },
  },
  methods: {
    away: function () {
      return (this.hover = !!this.hover);
    },
  },
};
</script>

<style lang="postcss" scoped>
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
