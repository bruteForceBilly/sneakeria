<template>
  <div>
    <div v-if="mode === 'links'" class="flex justify-center">
      <div v-for="(link, index) in links" :key="link.value">
        <span
          @click="setByRoute(true)"
          class="no-underline uppercase tracking-widest text-black text-xs py-3 mr-8 border-transparent border-b-2 hover:border-black"
          :class="[index > 1 ? 'font-normal' : 'font-bold']"
        >
          <router-link :to="link.value">
            {{ link.label }}
          </router-link>
        </span>
      </div>
    </div>
    <div v-else-if="mode === 'icons'" class="flex item-center">
      <div v-for="icon in icons" :key="icon.value" @click="setByRoute(true)">
        <router-link :to="icon.value">
          <img :src="require(`@/assets/${icon.src}`)" class="px-1 sm:px-2" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    links: Array,
    icons: Array,
    flyOut: {
      type: Boolean,
    },
    mode: {
      type: String,
      validator: function (value) {
        return ["icons", "links"].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    setByRoute(arg) {
      return this.$store.commit("setByRoute", arg);
    },
  },
};
</script>
