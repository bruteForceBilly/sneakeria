<template>
  <div>
    <div class="relative">
      <!-- Container start -->
      <div
        class="border-b flex justify-between items-center"
        style="height:50px;"
      >
        <!-- Hamburger -->
        <div class="float-left xl:ml-12 py-2 pl-2 pr-6 absolute z-50 md:hidden">
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
        <template v-if="navbarMode === 'navbar--desktop'">
          <!-- Flyout -->
          <div
            class="absolute z-50 inset-x-0 bottom-0 w-full shadow-lg"
            style="top:50px"
          >
            <div
              @mouseleave="leaveSetShow()"
              :class="[
                show
                  ? 'w-full bg-white shadow-lg pt-6 pb-12 md:pt-4 flex justify-start md:justify-center px-2 md:32'
                  : ''
              ]"
            >
              <slot name="fly-out"> </slot>
            </div>
          </div>
          <!-- Featured links -->
          <div class="-mb-px">
            <slot name="navbar--desktop"></slot>
          </div>
        </template>
        <template else>
          <!-- Flyout -->
          <div class="absolute z-50 inset-x-0 top-0">
            <div
              @mouseleave="leaveSetShow()"
              :class="[show ? 'w-full overflow-hidden' : '']"
            >
              <div v-if="show" class="w-full absolute bg-white shadow-lg">
                <div
                  class="border-b flex justify-center item-center"
                  style="height:50px"
                >
                  <img src="@/assets/logo.svg" class="absolute" />
                  <img
                    @click="toggleSetShow()"
                    src="@/assets/x.svg"
                    class="relative z-50 ml-auto mr-6"
                  />
                </div>
                <div class="px-8 pt-4 pb-6">
                  <slot name="navbar--mobile"></slot>
                </div>
              </div>
              <div
                class="fixed inset-0 w-full"
                style="top:0px"
                :style="`left:${shifted}%`"
              >
                <slot name="fly-out"> </slot>
              </div>
            </div>
          </div>
        </template>
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
  props: ["show", "leaveSetShow", "toggleSetShow", "navbarMode", "shifted"],
  computed: {
    mq() {
      return this.$mq;
    }
  }
};
</script>
