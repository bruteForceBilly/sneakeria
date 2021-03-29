<template>
  <div>
    <div v-if="navigationIsloading">...loading</div>
    <div :style="{ height: `${hangHeight}px` }" class="mb-3" v-else>
      <div
        v-hang="'hang'"
        :class="{
          'hang-enter fixed left-0 top-5 z-70 w-full': hang,
          '`static`': !hang,
        }"
      >
        <!-- Start Horizontal layout -->
        <div
          v-if="!isMobileScreen"
          class="relative bg-white w-full flex justify-start items-center transition delay-500 duration-500 ease-in-out"
          :class="hang ? 'border border-gray-900' : 'border-t border-b'"
        >
          <slot name="desktop"></slot>
        </div>
        <!-- End Horizontal -->
      </div>

      <!-- If mobile -->
      <div
        v-if="isMobileScreen"
        :style="{
          '`height: calc(${menuHeight()}px - 1rem)`': hang,
        }"
        class="relative w-full mobile-menu-grid transition delay-500 duration-500 ease-in-out bg-gray-300 border-t border-b"
        :class="{
          'border border-gray-900 bg-gray-900': hang,
        }"
      >
        <slot name="mobile"></slot>
      </div>
      <!-- End of If mobile -->
    </div>

    <div v-if="!hang" class="mt-4">
      <slot name="selected-options"></slot>
    </div>
  </div>
</template>

<script>
import hang from "@/directives/hang.js";

export default {
  name: "SelectionBarLayout",
  directives: {
    hang,
  },
  props: {
    navigationIsloading: {
      type: Boolean,
    },
    settings: {
      type: Object,
    },
  },
  data() {
    return {
      hang: false,
      hangHeight: null,
      windowHeight: null,
    };
  },
  computed: {
    isMobileScreen() {
      return this.$mq !== "xl" ? true : false;
    },
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
    });
  },
  methods: {
    menuHeight() {
      return this.windowHeight - 55;
    },
  },
};
</script>

<style lang="postcss" scoped>
.mobile-menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
}

.hang-enter {
  animation-name: hang;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}
@keyframes hang {
  0% {
    padding: 0 2rem;
    opacity: 0;
    transform: translateY(-100%);
  }
  50% {
    padding: 0 2rem;
    transform: translateY(0);
  }
  100% {
    padding: 0 1rem;
    opacity: 1;
  }
}
</style>
