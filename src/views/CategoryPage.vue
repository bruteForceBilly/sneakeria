<template>
  <div>
    <p>
      This is Category Page fromeHome: {{ fromHome }} <br />
      search: {{ search }} <br />
    </p>
    <SearchForm
      v-if="navigation.data"
      :selected-options="fromHome ? {} : queryParamsObject"
    ></SearchForm>
    queryParamsSlug: {{ queryParamsSlug }} <br />
    queryParamsObject: {{ queryParamsObject }} <br />
    <strong> queryParamsString: {{ queryParamsString }} </strong>

    <br />
    <br />
    <br />
    {{ products.data }}
  </div>
</template>

<script>
import axios from "axios";
import { API_PRODUCTS, API_SITE } from "@/constants";
import SearchForm from "@/components/SearchForm/SearchForm.vue";

export default {
  name: "CategoryPage",
  components: {
    SearchForm
  },
  props: ["fromHome", "search"],
  data() {
    return {
      queryParamsSlug: "",
      queryParamsString: "",
      queryParamsObject: {},
      products: {
        error: null,
        loading: null,
        data: null
      },
      navigation: {
        error: null,
        loading: null,
        data: null
      }
    };
  },
  created: function() {
    this.fetchNavigation();
  },
  beforeUpdate() {
    if (!this.search) return this.buildRouteQueryParamsObject();
  },
  watch: {
    $route: ["buildRouteQueryParamsObject"],
    queryParamsObject: ["buildRouteQueryParamsString", "buildKebabCaseSlug"],
    queryParamsString: ["fetchProducts"]
  },
  methods: {
    buildRouteQueryParamsObject() {
      let that = this;
      let res = {};
      let arr = [];
      let splittedSlug = that.$route.path.substr(1).split("-");
      splittedSlug.forEach(function(searchItem) {
        that.navigation.data.filter(function(obj) {
          if (obj.values.includes(searchItem)) {
            arr.push((res[obj.name] = searchItem));
          }
        });
      });
      if (this.search === false) {
        this.queryParamsObject = res;
      } else {
        return (this.queryParamsObject = this.$route.query);
      }
    },
    buildRouteQueryParamsString() {
      let routeQueryString = "";
      for (let [key, value] of Object.entries(this.queryParamsObject)) {
        routeQueryString += `${key}=${value}&`;
      }
      return (this.queryParamsString = routeQueryString.slice(0, -1));
    },
    buildKebabCaseSlug(obj) {
      let result = obj;
      return (this.queryParamsSlug = Object.values(result)
        .toString()
        .replace(/,/g, "-"));
    },
    redirect() {
      let obj = { name: "result", params: { id: this.queryParamsSlug } };
      console.log("hello from redir");
      return this.queryParamsSlug != this.$route.params.id
        ? this.$router.push(obj)
        : null;
    },
    fetchProducts() {
      let that = this;
      this.products.error = this.products.data = null;
      this.products.loading = true;
      axios
        .get(API_PRODUCTS + "?" + this.queryParamsString)
        .then(response => (this.products.data = response.data))
        .catch(err => (this.products.error = err.toString()))
        .finally(function() {
          console.log("fetch products ran");
          that.redirect();
          that.products.loading = false;
        });
    },
    fetchNavigation() {
      this.navigation.error = this.navigation.data = null;
      this.navigation.loading = true;
      axios
        .get(API_SITE)
        .then(response => (this.navigation.data = response.data))
        .catch(err => (this.navigation.error = err.toString()))
        .finally(() => (this.navigation.loading = false));
    }
  }
};
</script>
