<template>
  <div class="fixed z-40 sm:z-0 sm:static w-full">
    <div class="relative">
      <!-- Container start -->
      <div
        class="border-b px-4 lg:px-12 xl:px-4 bg-white flex justify-between items-center"
        style="height: 50px"
      >
        <!-- Sidebar Toggle Icon-->
        <div
          v-if="this.$mq == 'sm'"
          class="pr-2 sm:pr-0 sm:p-2 sm:ml-2 sm:mr-8"
        >
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

        <div v-if="this.$mq != 'sm'" class="">
          <slot name="links"></slot>
        </div>

        <!-- Icons ml-16 mr-2 xl:mr-12 -->
        <div class="sm:ml-16 sm:mr-2 xl:mr-12">
          <slot name="icons">
            <p>... icons shold go here</p>
          </slot>
        </div>

        <div
          v-if="show"
          class="block w-full h-screen absolute inset-0 z-20 bg-gray-900 opacity-25"
        >
          <span class="text-white text-xs fixed bottom-0 right-0 m-8"
            >made with ❤️ by bruteForceBilly</span
          >
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
    },
  },
};
</script>
