<template>
  <div
    v-hang="'hang'"
    class="w-full fixed z-60"
    :class="[isVisible ? 'visible' : 'invisible']"
  >
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
          <router-link :to="{ name: 'home' }" custom>
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
        ></div> 
      </div>
    </div>
  </div>
</template>

<script>
import hang from "@/directives/hang.js";

export default {
  name: "TheHeaderLayout",
  props: ["show", "setShow"],
  data() {
    return {
      hang: false,
      windowHeight: null,
      scrollY: null
    };
  },
  computed: {
    isVisibleDesktop(){
      return this.scrollY < 200 && this.$mq == 'xl'  ? true : false
    },
    isVisibleMobile(){
      return this.$mq !== 'xl'  ? true : false
    },
    isVisible(){
      return this.$mq !== 'xl' ? this.isVisibleMobile : this.isVisibleDesktop;
    },
    
    mq() {
      return this.$mq;
    }
  },
  directives: {
    hang: hang,
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
    });
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY
    });
  },
  destroyed () {
    window.removeEventListener('scroll');
  },

};
</script>
