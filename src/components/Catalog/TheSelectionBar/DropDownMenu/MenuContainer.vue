<template>
  <div>
    <ul :class="isExpanded ? containerStyle : 'hidden'">
      <slot name="options"> ... waiting for content</slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CatalogFilterBarDropDownMenuContainer",
  props: {
    isExpanded: Boolean,
    isMobile: Boolean,
    item: Object,
    itemContainerSize: {
      type: String,
      default: function () {
        return this.item?.containerSize ? this.item.containerSize : "base";
      },
    },
  },
  computed: {
    containerLayout() {
      const containers = {
        "base": () => {
          return this.isMobile ? this.baseMobileStyle : this.baseStyle;
        },
        "base-left": () => {
          return this.isMobile ? this.baseLeftMobileStyle : this.baseLeftStyle;
        },
        "wide": () => {
          return this.isMobile ? this.wideMobileLayout : this.wideLayout;
        },
        "wide-center": () => {
          return this.isMobile
            ? this.wideCenterMobileStyle
            : this.wideCenterStyle;
        },
        "default": () => {
          return this.isMobile ? this.baseMobileStyle : this.baseStyle;
        },
      };

      const getContainerLayout = function (layout) {
        let fn;

        if (containers[layout]) {
          fn = containers[layout];
        } else {
          fn = containers["default"];
        }

        return fn();
      };

      return getContainerLayout(this.itemContainerSize);
    },
    containerStyle() {
      const containers = {
        "base": () => {
          return this.isMobile ? this.baseMobileStyle : this.baseStyle;
        },
        "base-left": () => {
          return this.isMobile ? this.baseLeftMobileStyle : this.baseLeftStyle;
        },
        "wide": () => {
          return this.isMobile ? this.wideMobileStyle : this.wideStyle;
        },
        "wide-center": () => {
          return this.isMobile
            ? this.wideCenterMobileStyle
            : this.wideCenterStyle;
        },
        "default": () => {
          return this.isMobile ? this.baseMobileStyle : this.baseStyle;
        },
      };

      // eslint-disable-next-line no-unused-vars
      const getContainerSize = function (size) {
        let fn;

        if (containers[size]) {
          fn = containers[size];
        } else {
          fn = containers["default"];
        }

        return fn();
      };

      return getContainerSize(this.itemContainerSize);
    },
  },
  data() {
    return {
      baseStyle: "container",
      baseMobileStyle: "container container--mobile",
      baseLeftStyle: "container container--left",
      baseLeftMobileStyle: "container container--mobile",
      wideStyle:
        "container container--wide inline-flex flex-row flex-wrap justify-between",
      wideMobileStyle:
        "container container--mobile inline-flex flex-row flex-wrap",
      wideCenterStyle: "container container--wide",
      wideCenterMobileStyle: "container container--mobile",
    };
  },
  created() {},
};
</script>

<style lang="postcss" scoped>
.top-postition {
  top: calc(100% - 2px);
}

.container {
  @apply bg-white border border-black outline-none pb-3 pt-3 top-postition absolute rounded-none w-40 z-20;
}

.container--mobile {
  @apply relative border-transparent pt-0 w-full;
}

.container--left {
  @apply right-0 w-56;
}

.container--wide {
  @apply w-52 px-1;
}
</style>
