<template>
  <div
    class="no-underline font-normal uppercase tracking-widest text-xs py-3 mr-8 border-transparent border-b-2 hover:border-black"
    :class="{ 'font-bold': link.id < 3 }"
  >
    <AppIcon
      v-if="link.name === 'icons'"
      :is-filled="$store.state.wishlist.wishes.length > 0"
      class="px-1 sm:px-2"
    >
      <IconHeart />
    </AppIcon>

    <span v-if="link.name === 'links'" class="text-black">{{
      link.label
    }}</span>
  </div>
</template>

<script>
import AppIcon from "@/components/App/Base/AppIcon.vue";
import IconHeart from "@/components/App/Base/IconHeart.vue";

// !!$store.state.wishlist.wishes
export default {
  name: "HeaderNavLink",
  components: {
    AppIcon,
    IconHeart,
  },
  props: {
    link: {
      type: Object,
    },
  },
};
</script>

<style lang="postcss" scoped></style>
