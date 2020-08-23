<template>
  <div>
    <HeaderNavSettings v-slot:default="{ items }">
      <div v-if="mode === 'links'" class="flex justify-center">
        <div v-for="(link, index) in items.links" :key="link.value">
          <span
            @click="setByRoute(true)"
            class="no-underline uppercase tracking-widest text-black text-sm py-3 mr-8 border-transparent border-b-2 hover:border-black"
            :class="[index > 1 ? 'font-normal' : 'font-bold']"
          >
            <router-link
              :to="{ name: 'searchRequestRoute', params: { id: link.value } }"
            >
              {{ link.label }}
            </router-link>
          </span>
        </div>
      </div>
      <div v-else-if="mode === 'icons'" class="flex item-center">
        <div v-for="icon in items.icons" :key="icon.value">
          <img :src="require(`@/assets/${icon.src}`)" class="px-2" />
        </div>
      </div>
    </HeaderNavSettings>
  </div>
</template>

<script>
import HeaderNavSettings from "./HeaderNavSettings.vue";

export default {
  components: {
    HeaderNavSettings
  },
  props: {
    flyOut: {
      type: Boolean
    },
    mode: {
      type: String,
      validator: function(value) {
        return ["icons", "links"].indexOf(value) !== -1;
      }
    }
  },
  methods: {
    setByRoute(arg) {
      return this.$store.commit("setByRoute", arg);
    }
  }
};
</script>
