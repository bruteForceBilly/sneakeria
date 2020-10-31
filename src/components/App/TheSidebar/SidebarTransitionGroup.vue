<template>
  <transition-group :appear="appear" :name="animation" tag="div">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: "SidebarTransitionGroup",
  props: {
    animation: {
      type: String,
    },
    appear: {
      type: Boolean,
    },
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 1.5s ease;
}

.slide-fade-leave-active {
  display: none;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10%);
}

.slide-fade-enter-to,
.slide-fade-leave {
  opacity: 1;
  transform: translateX(0px);
}
.fade-enter-active {
  transition: all 5s ease 0.5s;
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
