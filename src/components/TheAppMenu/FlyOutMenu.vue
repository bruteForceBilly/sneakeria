<template>
  <div>
    <div
      class="w-full bg-white shadow-lg pt-6 pb-12 md:pt-4 pb-6 flex justify-start md:justify-center px-2 md:32"
    >
      <div
        class="flex flex-grow flex-col md:flex-row justify-between text-left tracking-wide px-2 md:px-24 xl:px-64"
      >
        <div
          v-for="(group, index) in selectedNavigation.groups"
          :key="group.id + '-group' + index"
        >
          <h3
            class="uppercase tracking-widest font-black text-sm py-3 mr-8 text-gray-400"
          >
            {{ group.label }}
          </h3>
          <div
            v-for="(category, index) in group.categories"
            :key="category.id + '-category' + index"
          >
            <h4
              class="uppercase tracking-widest font-bold text-gray-600 text-xs py-3 mr-8"
            >
              {{ category.label }}
            </h4>
            <div
              v-for="(option, index) in category.options"
              :key="option.id + '-option' + index"
            >
              <h5 class="text-gray-900 text-xs py-3 mr-8">
                {{ option.label }}
              </h5>
            </div>
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
