<template>
  <div class="px-8 mb-8 shadow-md flex justify-between items-center">
    <div class="float-left">
      <slot name="logo">
        <p>... logo should go here</p>
      </slot>
    </div>
    <div class="-mb-px">
      <slot name="navbar">
        <p>AppMenu Navigation goes Here</p>
      </slot>
    </div>
    <div class="float-right w-1/12">
      <div class="flex justify-around items-center">
        <slot name="modal">
          <p>... modal shold go here</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMenuLayout"
};
</script>
