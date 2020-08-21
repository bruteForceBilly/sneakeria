<template>
  <div>
    <div class="relative">
      <!-- Container start -->
      <div
        class="border-b flex justify-start items-center"
        style="height:50px;"
      >
        <!-- Sidebar Toggle Icon -->
        <div class="p-2 ml-2 mr-8">
          <slot name="sidebarToggleIcon">
            <p>... sidebarToggleIcon should go here</p>
          </slot>
        </div>

        <!-- Logo -->
        <div class="">
          <router-link :to="{ name: 'home' }">
            <slot name="logo">
              <p>... logo should go here</p>
            </slot>
          </router-link>
        </div>

        <div class="flex-grow">
          <slot name="links"></slot>
        </div>

        <div class="ml-16 mr-2 xl:mr-12">
          <slot name="icons">
            <p>... icons shold go here</p>
          </slot>
        </div>

        <div v-if="show" class="block w-full h-screen absolute inset-0 z-20 bg-gray-900 opacity-25">
            <span class="text-white text-xs fixed bottom-0 right-0 m-8">made with ❤️ by bruteForceBilly</span>
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
