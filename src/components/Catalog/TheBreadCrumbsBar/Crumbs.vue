<template>
  <div
    v-if="selects"
    class="flex flex-row items-center py-1 text-gray-800 font-sans font-normal text-sm capitalize tracking-widest"
  >
    <div v-for="(item, index) in selects" :key="item + index">
      <template v-if="index === 0">
        <a
          @click="toggleIndexAndSuccseedors(index)"
          class="cursor-pointer"
          :class="[selects.length === 1 ? 'no-underline' : 'underline']"
        >
          {{ item }}</a
        >
        <span
          class="mx-2"
          :class="[selects.length === 1 ? 'invisible' : 'visible']"
          >/</span
        >
      </template>
      <template v-else-if="index === selects.length - 1">
        <a class="no-underline cursor-auto">{{ item }}</a>
        <span class="mx-2"></span>
      </template>
      <template v-else-if="index > 0 && index % 2">
        <a
          @click="toggleIndexAndSuccseedors(index)"
          class="cursor-pointer underline"
        >
          {{ item }}</a
        >
        <span class="mx-2">/</span>
      </template>
      <template v-else>
        <a
          @click="
            toggleIndex({
              name: selectedOptionsElements[index + 1].name,
              value: selectedOptionsElements[index + 1].value,
            })
          "
          class="underline cursor-pointer"
        >
          {{ item }}</a
        >
        <span class="mx-2">/</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TheBreadCrumbBar",
  props: {
    selects: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters("navigation", ["selectedOptionsElements"]),
  },
  methods: {
    ...mapActions("navigation", [
      "toggleIndex",
      "toggleIndexAndSuccseedors",
      "selectOptionsCheckToggle",
    ]),
  },
};
</script>
