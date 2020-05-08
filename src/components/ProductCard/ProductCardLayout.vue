<template>
  <article
    v-on:mouseenter="hover = true"
    v-on:mouseleave="hover = false"
    class="relative w-full flex flex-no-wrap overflow-hidden bg-white"
    :class="[
      layout === 'card'
        ? 'flex-col flex-no-wrap'
        : 'flex-row items-stretch justify-center'
    ]"
  >
    <div
      class="overflow-hidden"
      :class="[layout === 'card' ? 'flex flex-col' : 'flex-grow max-w-half']"
    >
      <section
        class="relative z-10 max-h-full overflow-hidden w-full flex-shrink temp-bg"
      >
        <section>
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

        <div class="flex justify-center max-h-full">
          <slot name="image">
            <img class="" src="@/assets/2.png" />
          </slot>
        </div>
        <div
          class="z-50 overflow-hidden"
          :class="[
            hover ? 'block' : 'hidden',
            layout === 'card' ? 'w-full relative' : 'absolute bottom-0 w-1/2'
          ]"
        >
          <slot name="thumbs"> </slot>
        </div>
      </section>
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
    settings: Object
  },
  data() {
    return {
      hover: false
    };
  },
  computed: {
    layout() {
      return this.settings.settings.layout;
    }
  }
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
