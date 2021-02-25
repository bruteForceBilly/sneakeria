<template>
  <div>
    <div :class="[isExpanded ? 'inline-block' : 'hidden', containerStyle]">
      <ul
        class="flex-wrap"
        :class="
          itemContainerSize === 'wide'
            ? 'inline-flex flex-row pl-2'
            : 'flex flex-wrap flex-col justify-start'
        "
      >
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>
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
      wideStyle: "container container--wide",
      wideMobileStyle: "container container--mobile ",
      wideCenterStyle: "container container--wide",
      wideCenterMobileStyle: "container container--mobile ",
    };
  },
  created() {},
};
</script>

<style lang="postcss" scoped>
.top-postition {
  top: calc(100% - 1px);
}

.container {
  @apply bg-white border border-black outline-none pt-2 pb-3 top-postition absolute rounded-none w-40 z-20;
}

.container--mobile {
  @apply relative border-transparent w-full;
}

.container--left {
  @apply right-0;
}

.container--wide {
  @apply w-60;
}

.base-left {
  right: 0;
}
</style>
