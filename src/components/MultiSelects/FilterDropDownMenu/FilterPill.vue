<template>
  <div>
    <button
      class="py-1 px-4 no-underline rounded-full bg-gray-300 text-gray-800 font-sans font-normal text-sm lowercase btn-primary focus:outline-none mr-2"
    >
      <slot></slot>
      <span class="font-hairline text-gray-600 ml-1">x</span>
    </button>
  </div>
</template>

<script>
export default {};
</script>
