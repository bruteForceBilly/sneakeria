<template>
  <div>
    <button
      class="py-1 text-gray-800 font-sans font-normal text-sm lowercase"
      :class="[
        link
          ? 'px-0 mx-2 underline bg-transparent'
          : 'px-4 no-underline bg-gray-300 btn-primary rounded-full focus:outline-none mr-2',
      ]"
    >
      <div class="inline">
        <slot></slot>
      </div>

      <div v-show="!link" class="inline">
        <span class="font-hairline text-gray-600 ml-1 inline">x</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: ["link"],
};
</script>
