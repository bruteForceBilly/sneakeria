<template>
  <div>
    <div
      class="w-full bg-white shadow-lg pt-6 pb-12 md:pt-4 pb-6 flex justify-start md:justify-center px-2 md:32"
    >
      <div
        class="flex flex-grow flex-col md:flex-row justify-between text-left tracking-wide px-2 md:px-24 xl:px-64"
      >
        {{ selectedNavigation }}
        <div v-for="group in selectedNavigation.groups" :key="group.id">
          <h3
            class="no-underline text-black border-transparent border-b-2 hover:border-black uppercase tracking-widest font-bold text-sm py-3 mr-8"
          >
            {{ group.label }}
          </h3>
          <div v-for="category in group" :key="category.id">
            <h4>{{ category.label }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlyOutMenu",
  props: ["featuredNavigation", "selectedNavigation"],
  methods: {
    setByRoute(arg) {
      return this.$store.commit("setByRoute", arg);
    }
  }
};
</script>
