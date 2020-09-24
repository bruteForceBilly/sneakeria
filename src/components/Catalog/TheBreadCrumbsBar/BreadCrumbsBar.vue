<template>
  <div
    v-if="selects"
    class="flex flex-row items-center py-1 text-gray-800 font-sans font-normal text-sm capitalize tracking-widest"
  >
    <div class="">
      <span class="font-black mr-2">←</span>
      <span
        @click="$router.go(-1)"
        class="underline cursor-pointer uppercase font-black"
        >Back</span
      >
      <span class="mx-2">/</span>
    </div>
    <div class="">
      <router-link to="all">
        <span class="underline cursor-pointer">Home</span>
      </router-link>
      <span class="mx-2">/</span>
    </div>
    <div v-for="(option, index) in selectedOptionsElements" :key="option.value">
      <template v-if="index === 0">
        <div class="">
          <span
            @click="toggleIndexSuccseedors(index)"
            class="cursor-pointer"
            :class="[
              selectedOptionsElements.length === 1
                ? 'no-underline'
                : 'underline',
            ]"
          >
            {{ option.label }}</span
          >
          <span
            class="mx-2"
            :class="[
              selectedOptionsElements.length === 1 ? 'invisible' : 'visible',
            ]"
            >/</span
          >
        </div>
      </template>
      <template v-else-if="index === selectedOptionsElements.length - 1">
        <div>
          <span class="no-underline cursor-auto">{{ option.label }}</span>
          <span class="mx-2"></span>
        </div>
      </template>
      <template v-else-if="index > 0 && index % 2">
        <div class="">
          <span
            @click="toggleIndexSuccseedors(index)"
            class="cursor-pointer underline"
          >
            {{ option.label }}</span
          >
          <span class="mx-2">/</span>
        </div>
      </template>
      <template v-else>
        <div class="">
          <span
            @click="
              selectOptionsCheckToggle(
                clickedOptionObject(
                  selectedOptionsElements[index + 1].name,
                  selectedOptionsElements[index + 1].value
                )
              )
            "
            class="underline cursor-pointer"
          >
            {{ option.label }}</span
          >
          <span class="mx-2">/</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheBreadCrumbBar",
  props: {
    selects: {
      type: Array,
    },
  },
  computed: {
    selectedOptionsElements() {
      return this.selects
        .map((select) => select.options)
        .flat()
        .filter((option) => option.checked);
    },
  },
  methods: {
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
    selectOptionsCheckToggle(arg) {
      for (let [key, value] of Object.entries(arg)) {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            this.selects
              .map((select) => select.options)
              .flat()
              .filter((option) => option.name === key)
              .filter((option) => option.value === v)
              .forEach((el) => this.toggleElement(el));
          });
        } else {
          this.selects
            .map((select) => select.options)
            .flat()
            .filter((option) => option.name === key)
            .filter((option) => option.value === value)
            .forEach((el) => this.toggleElement(el));
        }
      }
    },
    toggleElement(el) {
      return !el.checked ? (el.checked = true) : (el.checked = false);
    },
  },
};
</script>

<style scoped></style>
