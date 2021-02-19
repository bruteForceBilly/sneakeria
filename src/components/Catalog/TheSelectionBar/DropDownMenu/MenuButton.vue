<template>
  <div :class="block ? 'block' : 'inline-block min-w-32'">
    <!-- Menu Button to trigger opening of Menu Container 
    Menu label slot is set by Menu
    -->

    <button
      class="outline-none uppercase relative z-10 w-full border bg-white border-transparent px-3 py-2 rounded-none"
      :class="hover ? 'border-hover z-30' : ''"
    >
      <div
        :class="
          block ? 'flex justify-between items-center' : 'flex items-center'
        "
      >
        <span
          class="pr-1 tracking-widest text-sm"
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
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "CatalogFilterBarDropDownMenuButton",
  props: ["hover", "hasSelected", "block"],
};
</script>
<style scoped>
.border-hover {
  border: 1px solid black;
  border-bottom: 0 solid transparent;
  box-shadow: 0 1px 0 0 transparent;
}
</style>
