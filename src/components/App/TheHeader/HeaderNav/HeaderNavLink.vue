<template>
  <div
    class="no-underline font-normal cursor-pointer uppercase tracking-widest text-xs mr-4 sm:mr-8 py-3 border-transparent border-b-2 hover:border-black"
    :class="{ 'font-bold': link.id < 3 }"
  >
    <AppIcon
      v-if="link.name === 'icon'"
      :is-filled="iconIsFilled"
      :status="iconStatus(link.src)"
      :name="link.label"
    >
      <component :is="link.src"></component>
    </AppIcon>

    <span v-if="link.name === 'links'" class="text-black">{{
      link.label
    }}</span>
  </div>
</template>

<script>
import AppIcon from "@/components/App/Base/AppIcon.vue";
import IconHelp from "@/components/App/Base/IconHelp.vue";
import IconWish from "@/components/App/Base/IconWish.vue";

export default {
  name: "HeaderNavLink",
  components: {
    AppIcon,
    IconWish,
    IconHelp,
  },
  props: {
    link: {
      type: Object,
    },
  },
  computed: {
    iconIsFilled() {
      return this.link.src == "IconWish" &&
        this.$store.state.wishlist.wishes.length > 0
        ? true
        : false;
    },
  },
  methods: {
    iconStatus(val) {
      let res;
      if (val == "IconWish") {
        res = this.$store.state.wishlist.wishes.length;
      } else if (val == "IconHelp") {
        res = false;
      }
      return res;
    },
  },
};
</script>
