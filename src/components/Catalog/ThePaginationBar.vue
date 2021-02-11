<template>
  <div class="mt-20 mb-64 flex flex-row">
    <span
      @click="setSelectedPage(pagination.pagePrevious)"
      class="cursor-pointer mt-4 align text-sm tracking-widest text-gray-900 font-black underline"
      :class="pagination.pageCurrent === 1 ? 'invisible' : 'visible'"
    >
      PREVIOUS
    </span>

    <div class="ml-auto flex flex-row justify-center align-baseline">
      <span class="mt-4 mr-3 text-sm text-widest text-gray-900">Page:</span>
      <div
        class="flex justify-center relative"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <button
          class="outline-none uppercase z-30 border bg-white border-gray-300 py-3 px-6 rounded-none flex items-center w-20"
        >
          <span class="pr-1 flex-1 font-medium">
            {{ selectedPage }}
          </span>

          <span>
            <svg
              class="fill-current h-4 w-4"
              :class="hover ? 'transform -rotate-180' : ''"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </span>
        </button>

        <div
          class="position-after-height inline-block z-20 absolute w-20 border-gray-300 outline-none border bg-white rounded-none"
          :class="hover ? 'inline-block' : 'hidden'"
        >
          <ul class="list-outside">
            <li
              @click="setSelectedPage(option.id)"
              class="hover:bg-gray-200 w-full py-3"
              v-for="option in options"
              :key="option.id"
            >
              <label class="custom-label flex justify-center font-medium">
                <span>{{ option.label }} </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <span class="mt-4 ml-2 text-sm text-widest text-gray-900"
        >of {{ pagination.pageCount }}
      </span>
    </div>
    <span
      @click="setSelectedPage(pagination.pageNext)"
      class="cursor-pointer mt-4 align ml-auto text-sm tracking-widest text-gray-900 font-black underline"
      :class="
        pagination.pageCurrent === pagination.pageCount
          ? 'invisible'
          : 'visible'
      "
    >
      NEXT
    </span>
  </div>
</template>

<script>
/*
containerSize: (...)
id: (...)
inputType: (...)
label: (...)
multiple: (...)
name: (...)
options: (...)
value: (...)
*/

export default {
  data() {
    return {
      hover: false,
      selectedPage: 1,
    };
  },
  methods: {
    setSelectedPage(n) {
      return (this.selectedPage = n);
    },
  },
  computed: {
    pagination() {
      const {
        pageCount,
        pageCurrent,
        pageNext,
        pagePrevious,
        contentLimit,
        contentCount,
        contentStart,
        contentEnd,
      } = this.$store.state.search.foundProductsPagination;
      return {
        pageCount,
        pageCurrent,
        pageNext,
        pagePrevious,
        contentLimit,
        contentCount,
        contentStart,
        contentEnd,
      };
    },
    options() {
      const makeArray = (n) => {
        let arr = [];
        for (let i = 0; i < n; i++) {
          arr.push({
            id: i + 1,
            label: `${i + 1}`,
            name: "pagination",
            value: i,
            level: "option",
            checked: false,
          });
        }
        return arr;
      };

      return makeArray(this.pagination.pageCount);
    },
    paginationMenu() {
      return {
        containerSize: "base",
        id: 1,
        inputType: "hidden",
        label: this.pagination.pageCurrent,
        name: "page",
        value: null,
        options: this.options,
      };
    },
    route() {
      return this.$store.state.route;
    },
  },
  watch: {
    route: {
      deep: true,
      handler: function () {
        return this.setSelectedPage(1);
      },
    },
    selectedPage: function (newVal) {
      return this.$router
        .push({
          path: this.$store.state.route.path,
          query: { _page: newVal },
        })
        .catch((e) => {});
    },
  },
  created() {
    this.selectedPage = this.pagination.pageCurrent;
  },
};
</script>

<style lang="postcss" scoped>
.position-after-height {
  top: calc(100% - 1px);
}
</style>
