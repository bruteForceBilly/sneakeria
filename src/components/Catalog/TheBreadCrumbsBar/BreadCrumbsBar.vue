<template>
  <div
    v-if="selects"
    class="flex flex-row items-center py-1 text-gray-800 font-sans font-normal text-sm capitalize tracking-widest"
  >
    <span class="font-black mr-2">←</span>
    <span
      @click="$router.go(-1)"
      class="underline cursor-pointer uppercase font-black"
      >Back</span
    >
    <span class="mx-2">/</span>

    <router-link to="all">
      <span class="underline cursor-pointer">Home</span>
    </router-link>

    <span class="mx-2">/</span>

    <Crumbs :selects="selects" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Crumbs from "./Crumbs.vue";

//      v-on:toggle-index-succseedors="toggleIndexSuccseedors($event)"
//v-on:crumbs-toggle="selectOptionsCheckToggle($event)"

export default {
  name: "TheBreadCrumbBar",
  components: {
    Crumbs,
  },
  props: {
    selects: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters("navigation", ["selectedOptionsElements"]),
  },
  methods: {
    ...mapActions("navigation", ["selectOptionsCheckToggle"]),
    toggleIndexSuccseedors(index) {
      let indexSuccseedors = this.selectedOptionsElements.splice(index + 1);
      return indexSuccseedors.forEach((o) => {
        this.selectOptionsCheckToggle(
          this.clickedOptionObject(o.name, o.value)
        );
      });
    },

    clickedOptionObject(name, value) {
      let o = {};
      o[name] = value;
      return o;
    },
  },
};
</script>
