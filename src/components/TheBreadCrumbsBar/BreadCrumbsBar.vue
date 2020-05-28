<template>
  <div
    v-if="selects"
    class="flex flex-row items-center py-1 text-gray-800 font-sans font-normal text-sm capitalize tracking-widest"
  >
    <div class="">
      <span class="font-black mr-2">←</span>
      <span class="underline uppercase font-black">Back</span>
      <span class=" mx-2">/</span>
    </div>
    <div class="">
      <span class="underline">Home</span>
      <span class="  mx-2">/</span>
    </div>
    <div
      v-for="(option, index) in selectedOptionsElements"
      :key="option.value"
      class=""
    >
      <template v-if="index === 0">
        <div class="">
          <span class="underline">{{ option.label }}</span>
          <span class="  mx-2">/</span>
        </div>
      </template>
      <template v-else-if="index === selectedOptionsElements.length - 1">
        <div>
          <span class="no-underline">{{ option.label }}</span>
          <span class="  mx-2"></span>
        </div>
      </template>
      <template v-else-if="index > 0 && index % 2">
        <div class="">
          <span class="underline">{{ option.label }}</span>
          <span class="  mx-2">/</span>
        </div>
      </template>
      <template v-else>
        <div class="">
          <span class="underline">{{ option.label }}</span>
          <span class="  mx-2">/</span>
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
      type: Array
    }
  },
  computed: {
    selectedOptionsElements() {
      return this.selects
        .map(select => select.options)
        .flat()
        .filter(option => option.checked);
    }
  }
};
</script>

<style scoped></style>
