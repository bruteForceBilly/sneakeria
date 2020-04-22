<template>
  <div>
    <div
      class="w-full shadow-lg pt-4 pb-12 md:py-6 flex justify-start md:justify-center"
    >
      <div
        class="flex flex-col md:flex-row justify-between text-left tracking-wide"
      >
        <ul
          v-for="(item, i) in siteMapData"
          :key="i + item"
          class="ml-8 md:mx-6"
        >
          <h3
            class="uppercase text-lg md:text-base font-medium my-3 md:mb-2 tracking-widest"
          >
            {{ item.name }}
            <!-- refactor api so you can easily get ALL from section, men and women etc -->
          </h3>
          <li
            v-for="(value, j) in item.values"
            :key="j + item"
            class="capitalize hover:underline hidden md:block"
          >
            <router-link :to="`/search?${item.name}=${value}`">
              {{ value }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlyOutMenu",
  props: ["siteMapData"]
};
</script>

<style lang="postcss" scoped></style>
