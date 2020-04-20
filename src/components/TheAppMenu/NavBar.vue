<template>
  <div>
    <ul>
      <div v-if="featuredCategory">
        <div
          v-for="(ul, index) in state.appMenuSettings.data"
          :key="index + ul"
        >
          <div v-if="ul.name === featuredCategory">
            <!-- Refactor to render component -->
            <li v-for="li in ul.values" :key="index + li">
              <router-link :to="`search?${ul.name}=${li}`">{{
                li
              }}</router-link>
            </li>
          </div>
        </div>
        <div v-if="featuredLink">
          <li>
            <router-link :to="{ name: featuredLink }">{{
              featuredLink
            }}</router-link>
          </li>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
  props: ["state", "featuredCategory", "featuredLink"],
  data() {
    return {
      loading: this.state.appMenuSettings.loading
    };
  }
};
</script>
