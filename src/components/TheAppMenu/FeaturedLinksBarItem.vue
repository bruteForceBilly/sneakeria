<template>
  <div
    class="no-underline uppercase tracking-widest text-black"
    :class="[navbarMode === 'navbar--mobile' ? 'w-full' : '']"
  >
    <template v-if="navbarMode === 'navbar--desktop'">
      <div @mouseenter="selectedNavigationHandler(item)">
        <router-link
          to="/product/1"
          class="font-bold text-sm py-3 mr-8 border-transparent border-b-2 hover:border-black"
          ><slot></slot
        ></router-link>
      </div>
    </template>
    <template v-else>
      <div
        @click="shift(-100), selectedNavigationHandler(item)"
        class="py-2 text-lg font-semibold"
      >
        <slot></slot> <span class="float-right"> ➜ </span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "FeaturedLinksBarItem",
  props: ["linkTo", "navbarMode", "selectedNavigationHandler", "item", "shift"]
};
</script>
