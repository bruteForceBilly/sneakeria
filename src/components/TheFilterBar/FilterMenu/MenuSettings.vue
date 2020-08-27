<template>
  <div
    class="relative inline-block mx-2"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <slot :hover="hover"></slot>
  </div>
</template>

<script>
export default {
  name: "FilterDropDownMenuSettings",
  data() {
    return {
      hover: false
    };
  }
};
</script>
