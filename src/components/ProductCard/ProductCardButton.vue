<template>
  <button
    :class="buttonStyle"
    class="text-sm focus:outline-none justify-center py-2 px-3 mx-2 uppercase tracking-widest leading-tight inline-block"
  >
    <template>
      <div
        class="flex flex-row flex-no-wrap justify-center items-center content-center"
      >
        <div class="flex-none">
          <span><slot></slot> </span>
        </div>

        <div v-if="icon === 'loader'" class="flex-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.1em"
            height="100%"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-loader"
          >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        </div>

        <div v-if="icon === 'heart'" class="relatie flex-none text-2xl ">
          <svg
            :class="[
              state.isSelectedVersionLiked ? 'fillSvg' : 'transparentSvg'
            ]"
            xmlns="http://www.w3.org/2000/svg"
            width="1.1em"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-heart"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
        </div>

        <div v-if="icon === 'none'" class="flex-initial"></div>

        <div v-if="icon === 'chevron-down'" class="flex-initial">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.1em"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div v-if="icon === 'chevron-left'" class="flex-initial">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.1em"
            height="1.1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>

        <div v-if="icon === 'chevron-up'" class="flex-initial">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.1em"
            height="1.1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-up"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>

        <div v-if="icon === 'chevron-right'" class="flex-initial">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.1em"
            height="1.1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </template>
  </button>
</template>

<script>
export default {
  name: "ProductCardButton",
  props: {
    icon: {
      type: String,
      default: "loader"
    },
    state: {
      type: Object
    },
    buttonStyle: {
      type: String,
      default: "primary"
    }
  }
};
</script>

<style lang="postcss">
.primary {
  @apply border-2 border-black bg-yellow-200 relative text-yellow-200;
}

.primary span,
.primary--inverted span,
.primary--inverted svg,
.primary svg {
  position: relative;
  z-index: 20;
  left: -5px;
  right: 5px;
  top: -4px;
  bottom: 0px;
}

.primary:before {
  content: "";
  background: black;
  position: absolute;
  left: -5px;
  right: 2px;
  top: -5px;
  bottom: 1px;
  border: 0px solid;
  z-index: 10;
}

.primary--inverted {
  @apply border-2 border-yellow-200 bg-black relative text-black font-semibold;
}

.primary--inverted:before {
  content: "";
  background: #fefcbf;
  position: absolute;
  left: -5px;
  right: 2px;
  top: -5px;
  bottom: 1px;
  border: 0px solid;
  z-index: 10;
}

.secondary {
  @apply font-semibold border-2 border-transparent bg-yellow-200;
}

.secondary:hover {
  color: #fefcbf;
  background: black;
}

.secondary--inverted {
  @apply font-semibold border-2 border-transparent bg-black text-yellow-200;
}

.link {
  @apply border-0 border-transparent font-semibold;
}

.link:hover {
  @apply font-semibold;
}

.fillSvg {
  fill: currentColor;
}

.transparentSvg {
  fill: transparent;
}

.square {
  @apply px-2;
}

.sm {
  padding: 0.25em !important;
}
</style>
