<template>
  <div
    :class="{
      'border-l-0 inline-block': !isMobile,
      'border-l-8 border-black': isMobile && hasSelected && !isExpanded,
    }"
  >
    <button
      class="outline-none uppercase bg-white rounded-none"
      :class="[
        isMobile && selectedOptionsLabels ? 'pt-2 pb-6' : 'py-3 sm:py-2',
        { 'border-hover z-30': !isMobile && isExpanded },
        isMobile
          ? 'py-4 px-3 w-full'
          : 'w-auto px-3 relative z-10 border border-transparent',
      ]"
    >
      <div
        class="flex tracking-widest text-left w-full"
        :class="
          isMobile
            ? 'justify-between items-center pl-2 pr-3'
            : 'items-center mr-1'
        "
      >
        <ul :class="[isMobile ? 'text-base' : 'text-sm']">
          <li :class="[hasSelected ? 'font-black' : 'font-normal']">
            <slot name="menu-label">Menu</slot>
          </li>

          <div
            v-show="isMobile"
            class="text-xs w-4/5 truncate absolute tracking-tight capitalize"
          >
            <li class="absolute">
              <span> {{ selectedOptionsLabels }}</span>
            </li>
            <div
              class="relative z-10 bg-gradient-to-l via-transparent from-white"
            >
              <span class="invisible">{{ selectedOptionsLabels }}</span>
            </div>
          </div>
        </ul>

        <span
          class="ml-auto"
          :class="{ 'absolute right-6 pt-4': hasSelected && isMobile }"
        >
          <svg
            class="fill-current"
            :class="[
              isExpanded ? 'transform -rotate-180' : '',
              isMobile ? 'h-6 w-6' : 'h-4 w-4',
            ]"
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
  props: {
    isExpanded: Boolean,
    isMobile: Boolean,
    hover: Boolean,
    hasSelected: Boolean,
    isBlock: Boolean,
    item: {
      type: Object,
      default: function () {
        return null;
      },
    },
  },
  computed: {
    selectedOptionsLabels() {
      return this.item !== null
        ? this.item.options
            .filter((option) => option.checked)
            .map((option) => option.label)
            .join(", ")
        : "";
    },
  },
  data() {
    return {
      buttonMobile: {
        "w-full py-4": this.isMobile,
      },
    };
  },
};
</script>
<style scoped>
button:focus {
  outline-width: 0;
  outline-style: auto;
  outline-color: transparent;
}

.border-hover {
  border: 1px solid black;
  border-bottom: 0 solid transparent;
  box-shadow: 0 1px 0 0 transparent;
}
</style>
