<template>
  <div>
    <div class="relative">
      <!-- Container start -->
      <div
        class="border-b flex justify-between items-center"
        style="height:50px;"
      >
        <!-- Hamburger -->
        <div
          @click="toggleSetShow()"
          class="float-left xl:ml-12 py-2 pl-2 pr-6 absolute z-50 md:hidden"
        >
          <slot name="hamburger">
            <p>... hamburger should go here</p>
          </slot>
        </div>

        <!-- Logo -->
        <div>
          <div
            v-if="this.$mq === 'sm' || this.$mq === 'md'"
            class="absolute inset-x-0 top-0"
          >
            <div class="w-full">
              <slot name="logo">
                <p>... logo should go here</p>
              </slot>
            </div>
          </div>
          <div v-else class="static">
            <div class="w-auto ">
              <router-link :to="{ name: 'home' }">
                <slot name="logo">
                  <p>... logo should go here</p>
                </slot>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Flyout -->
        <div class="absolute z-50 inset-x-0 bottom-0" style="top:50px">
          <slot name="fly-out">
            <div v-if="show === true" class="w-full shadow-lg">
              ... fly out goes here
            </div>
          </slot>
        </div>
        <!-- Featured links -->
        <div class="-mb-px">
          <slot name="navbar">
            <p>... featured Links goes here</p>
          </slot>
        </div>
        <!-- Icons -->
        <div class="float-right xl:mr-12">
          <slot name="icons">
            <p>... icons shold go here</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMenuLayout",
  data() {
    return {
      show: false
    };
  },
  computed: {
    mq() {
      return this.$mq;
    }
  },
  watch: {
    mq() {
      return (this.show = false);
    }
  },
  methods: {
    toggleSetShow() {
      if (this.show === false) {
        return (this.show = true);
      } else {
        return (this.show = false);
      }
    }
  }
};
</script>
