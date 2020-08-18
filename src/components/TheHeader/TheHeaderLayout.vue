<template>
  <div>
    <div class="relative">
      <!-- Container start -->
      <div class="border-b flex items-center" style="height:50px;">
        <!-- Sidebar Toggle Icon -->
        <div class="flex-grow p-2 relative z-50">
          <slot name="sidebarToggleIcon">
            <p>... sidebarToggleIcon should go here</p>
          </slot>
        </div>

        <!-- Logo -->
        <div class="flex-shrink">
          <router-link :to="{ name: 'home' }">
            <slot name="logo">
              <p>... logo should go here</p>
            </slot>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeaderLayout",
  props: ["show", "setShow"],
  computed: {
    mq() {
      return this.$mq;
    }
  }
};
</script>
