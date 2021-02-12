<template>
  <div
    v-if="selectedOptionsElements"
    class="flex flex-row items-center py-1 text-black font-sans font-normal text-sm capitalize"
  >
    <div v-for="(option, index) in selectedOptionsElements" :key="option.value">
      <template v-if="index === 0">
        <a
          @click="toggleIndexAndSuccseedors(index)"
          class="cursor-pointer"
          :class="[
            selectedOptionsElements.length === 1 ? 'no-underline' : 'underline',
          ]"
        >
          {{ option.label }}</a
        >
        <span
          class="mx-2"
          :class="[
            selectedOptionsElements.length === 1 ? 'invisible' : 'visible',
          ]"
          >/</span
        >
      </template>
      <template v-else-if="index === selectedOptionsElements.length - 1">
        <a class="no-underline cursor-auto">{{ option.label }}</a>
        <span class="mx-2"></span>
      </template>
      <template v-else-if="index > 0 && index % 2">
        <a
          @click="toggleIndexAndSuccseedors(index)"
          class="cursor-pointer underline"
        >
          {{ option.label }}</a
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
          {{ option.label }}</a
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
      return [
        this.selectedDisplayTitle(this.queryParamsObject.productProp),
        this.selectedDisplayTitle(this.queryParamsObject.versionProp),
      ].flat();
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
