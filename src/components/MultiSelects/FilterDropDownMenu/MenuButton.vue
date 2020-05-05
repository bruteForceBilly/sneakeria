<template>
  <div>
    <button
      class="outline-none relative z-10 border bg-white border-black px-3 py-1 rounded-none flex items-center min-w-32"
      :class="hover ? 'border-hover z-30' : ''"
    >
      <span
        class="pr-1 flex-1"
        :class="[hasSelected ? 'font-black' : 'font-normal']"
      >
        <slot name="menu-label">Menu</slot>
      </span>

      <span>
        <svg
          class="fill-current h-4 w-4"
          :class="hover ? 'transform -rotate-180' : ''"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "MenuButton",
  props: ["hover", "hasSelected"]
};
</script>
<style scoped>
.border-hover {
  border: 1px solid black;
  border-bottom: 0px solid transparent;
  box-shadow: 0 1px 0 0 transparent;
}
</style>
