<template>
  <button
    :class="buttonStyle"
    class="text-sm focus:outline-none justify-center py-3 uppercase tracking-widest leading-tight"
  >
    <template>
      <div
        class="flex flex-row flex-nowrap justify-center items-center content-center"
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

        <div
          v-if="icon === 'heart'"
          class="relatie flex-none text-vh-xs"
          @click="settings.settings.likeHandler()"
        >
          <svg
            :class="[
              settings.settings.selectedVersion.isLiked
                ? 'fillSvg'
                : 'transparentSvg',
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
      default: "loader",
    },
    settings: {
      type: Object,
    },
    buttonStyle: {
      default: "primary",
    },
  },
};
</script>

<style lang="postcss">
.primary {
  @apply border border-black bg-transparent relative;
}

.primary span,
.primary--inverted span,
.primary--inverted svg,
.primary svg {
  position: relative;
  top: -4px;
  right: 5px;
  bottom: 0;
  left: -5px;
  z-index: 20;
}

.primary--call-to-action > *,
.secondary--call-to-action > * {
  @apply text-white font-semibold tracking-widest text-base pl-1;
}

.primary::before {
  position: absolute;
  top: -4px;
  right: 1px;
  bottom: 1px;
  left: -4px;
  z-index: 10;
  content: "";
  background: black;
  border: 0 solid;
}

.primary--inverted {
  @apply border border-white bg-black relative text-black;
}

.primary--inverted::before {
  position: absolute;
  top: -4px;
  right: 1px;
  bottom: 1px;
  left: -3px;
  z-index: 10;
  content: "";
  background: white;
  border: 0 solid;
}

.secondary {
  @apply border-2 border-transparent bg-white;
}

.secondary:hover {
  color: white;
  background: black;
}

.secondary--inverted {
  @apply border-2 border-transparent bg-black text-white;
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
