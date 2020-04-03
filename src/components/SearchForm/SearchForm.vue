<template>
  <div>
    <SearchFormSettings v-slot:default="{ selects }">
      <form>
        <div v-for="(select, index) in selects" :key="index + select.name">
          <label :for="select.name"> {{ select.name }} </label>
          <select
            v-model.lazy="select.selectedOption"
            name="select.name"
            :id="select.name"
          >
            <option
              v-for="(option, index) in select.options"
              :key="index + option"
              :value="option.name"
              :selected="select.selectedOption"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
      </form>
    </SearchFormSettings>
  </div>
</template>

<script>
import SearchFormSettings from "@/components/SearchForm/SearchFormSettings";

export default {
  name: "SearchForm",
  components: {
    SearchFormSettings
  }
};
</script>

<style lang="scss" scoped></style>
