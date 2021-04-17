<template>
  <transition :appear="appear" :name="animation" :mode="mode" tag="div">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "SidebarTransition",
  props: {
    animation: {
      type: String,
    },
    appear: {
      type: Boolean,
    },
    mode: {
      type: String,
      validator: function (value) {
        return ["out-in", "in-out"].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-to,
.slide-leave {
  transform: translateX(0px);
}

.fade-enter-active {
  transition: all 0.5s ease 0.5s;
}
.fade-leave-active {
  display: none;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
