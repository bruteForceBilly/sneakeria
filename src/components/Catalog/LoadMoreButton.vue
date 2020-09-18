<template>
  <div v-if="searchFoundProductsLength > 12" class="block text-center mt-16">
    Showing {{ loadedProducts.length }} of
    {{ searchFoundProductsLength }} products <br />
    <meter
      min="0"
      :max="searchFoundProductsLength"
      :value="loadedProducts.length"
    >
    </meter>

    <button
      @click="catalogLoadCountCommit"
      class="block mx-auto mt-6 py-1 text-gray-800 font-sans font-normal text-sm px-4 no-underline bg-gray-300 btn-primary rounded-full focus:outline-none"
    >
      Load More
    </button>
  </div>
</template>

<script>
export default {
  props: {
    searchFoundProductsLength: {
      type: Number
    },
    loadedProducts: {
      type: Array
    }
  },
  methods: {
    catalogLoadCountCommit() {
      return this.$store.commit("catalogLoadCountMutation");
    }
  }
};
</script>
