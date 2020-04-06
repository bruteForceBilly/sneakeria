<template>
  <div>
    <p>This is Category Page {{ fromHome }}</p>
    <SearchForm
      :selected-options="fromHome ? this.$route.query : getSlugToObject"
    ></SearchForm>
    <h1>fetchKeys: {{ keys }}</h1>
  </div>
</template>

<script>
import axios from "axios";
import { API_PRODUCTS, API_LINKS } from "@/constants";
import SearchForm from "@/components/SearchForm/SearchForm.vue";

export default {
  name: "CategoryPage",
  components: {
    SearchForm
  },
  props: ["fromHome"],
  data() {
    return {
      loading: false,
      products: null,
      error: null,
      keys: []
    };
  },
  created() {
    this.fetchData();
    this.fetchKeys(["nike", "men"]);
  },
  watch: {
    $route: "fetchData"
  },
  computed: {
    buildRouteQueryString() {
      let routeQueryString = "";
      for (let [key, value] of Object.entries(this.$route.query)) {
        routeQueryString += `${key}=${value}&`;
      }
      return routeQueryString.slice(0, -1);
    },
    getSlugToObject() {
      // keys som passeras här ska bara förekomma i slugen
      return this.slugToObject(this.$route.path, [
        "section",
        "campaigns",
        "category",
        "look",
        "brand"
      ]);
    }
  },
  methods: {
    fetchKeys(argArr) {
      let that = this;
      // refactor from forEach to regular for loop
      // refactor with iterators & generators??
      // argArr.forEach(function(arg, i) {
      //   axios
      //     .get(API_LINKS + `/${i + 1}?_embed=options`)
      //     .then(function(response) {
      //       response.data.options.forEach(function(option) {
      //         if (option.value === arg)
      //           return that.keys.push(option.parentValue);
      //       });
      //     });
      // });

      for (let i = 1; i < 6; i++) {
        // console.log(i, argArr[i]);
        if (argArr[i] === undefined) {
          //console.log("na");
        } else {
          axios
            .get(API_LINKS + `/${i}?_embed=options`)
            .then(function(response) {
              response.data.options.forEach(function(option) {
                console.log(">>>", i, option.value, Array.isArray(argArr));
                if (option.value == argArr[i]) {
                  return that.keys.push(option.parentValue);
                } else {
                  //return that.keys.push("na");
                }
              });
            });
        }
      }

      /* arr.forEach(function(cv, i) {
        axios
          .get(API_LINKS + `/${i}?_embed=options`)
          .then(response => console.log(cv, response.data));
        //.catch(err => (this.error = err.toString()))
        //.finally(() => (this.loading = false));
      }); */
    },
    fetchData() {
      this.error = this.products = null;
      this.loading = true;
      axios
        .get(API_PRODUCTS + "?" + this.buildRouteQueryString)
        .then(response => (this.products = response))
        .catch(err => (this.error = err.toString()))
        .finally(() => (this.loading = false));
    },
    slugToObject(slug, keys) {
      let querySchemaObj = {};
      let slicedKeysArr = keys.slice(0, slug.substr(1).split("-").length);
      slicedKeysArr.forEach(function(key, i) {
        return (querySchemaObj[key] = slug.substr(1).split("-")[i]);
      });
      return querySchemaObj;
    },
    pathToObject(queryString) {
      function sort(arr, arg) {
        return arr.filter(function(cv, i) {
          if (i % 2 === arg) return cv;
        });
      }
      let result = {};
      let odd = sort(queryString.substr(1).split("-"), 0);
      let even = sort(queryString.substr(1).split("-"), 1);
      odd.forEach(function(cv, i) {
        result[cv] = even[i];
      });
      return result;
    }
  }
};
</script>
