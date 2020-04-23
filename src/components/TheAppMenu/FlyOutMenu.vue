<template>
  <div>
    <div
      class="w-full bg-white shadow-lg pt-6 pb-12 md:pt-4 pb-6 flex justify-start md:justify-center px-2 md:32"
    >
      <div
        class="flex flex-grow flex-col md:flex-row justify-between text-left tracking-wide px-2 md:px-24 xl:px-64"
      >
        <ul v-for="(item, i) in siteMapData" :key="i + item" class=" md:mx-6">
          <h3
            class="uppercase text-lg md:text-sm font-medium my-4 md:mb-2 tracking-widest"
          >
            {{ item.name }}
            <!-- refactor api so you can easily get ALL from section, men and women etc -->
          </h3>
          <li
            v-for="(value, j) in item.values"
            :key="j + item"
            class="capitalize hover:underline hidden md:block text-xs"
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
