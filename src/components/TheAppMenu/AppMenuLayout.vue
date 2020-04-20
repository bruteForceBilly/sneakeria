<template>
  <div>
    <slot name="logo">
      <p>... logo should go here</p>
    </slot>
    <slot name="navbar">
      <p>AppMenu Navigation goes Here</p>
    </slot>
    <slot name="modal">
      <p>... modal shold go here</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: "AppMenuLayout"
};
</script>
