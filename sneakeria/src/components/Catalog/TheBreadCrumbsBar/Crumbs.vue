<template>
  <div
    class="flex flex-row items-center py-1 text-black font-sans font-normal text-sm capitalize"
  >
    <div v-for="(option, index) in displayTitel" :key="option + index">
      <template v-if="index === 0">
        <a
          @click="toggleIndexAndSuccseedors(index)"
          class="cursor-pointer"
          :class="[displayTitel.length === 1 ? 'no-underline' : 'underline']"
        >
          {{ option }}</a
        >
        <span
          class="mx-2"
          :class="[displayTitel.length === 1 ? 'invisible' : 'visible']"
          >/</span
        >
      </template>
      <template v-else-if="index === displayTitel.length - 1">
        <a class="no-underline cursor-auto">{{ option }}</a>
        <span class="mx-2"></span>
      </template>
      <template v-else-if="index > 0 && index % 2">
        <a
          @click="toggleIndexAndSuccseedors(index)"
          class="cursor-pointer underline"
        >
          {{ option }}</a
        >
        <span class="mx-2">/</span>
      </template>
      <template v-else>
        <a
          @click="
            toggleIndex({
              name: displayTitel[index + 1].name,
              value: displayTitel[index + 1].value,
            })
          "
          class="underline cursor-pointer"
        >
          {{ option }}</a
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
  computed: {
    ...mapGetters("navigation", ["selectedOptionsElements"]),
    ...mapGetters("search", ["queryParamsObject", "selectedDisplayTitle"]),

    displayTitel() {
      return this.selectedDisplayTitle
        ? [
            this.selectedDisplayTitle(this.queryParamsObject.productProp),
            this.selectedDisplayTitle(this.queryParamsObject.versionProp),
          ]
            .filter((val) => val != null)
            .flat()
        : "";
    },
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
