<template>
  <div>
    <template v-if="navbarMode === 'navbar--desktop'">
      <!-- OLD  class="flex flex-grow flex-col md:flex-row justify-between text-left tracking-wide px-2 md:px-24 xl:px-64" -->
      <div
        class="flex flex-grow flex-row justify-center px-2 md:px-24 xl:px-64"
      >
        <div
          class="text-left tracking-wide text-xs m-4"
          v-for="(group, index) in selectedNavigation.groups"
          :key="group.id + '-group' + index"
        >
          <h3 class="font-black py-3 mr-8">
            <router-link
              :to="{ name: 'searchRequestRoute', params: { id: group.value } }"
            >
              {{ group.label }}
            </router-link>
          </h3>
          <!-- flex flex-row -->
          <div class="inline">
            <div
              v-for="(category, index) in group.categories"
              :key="category.id + '-category' + index"
            >
              <h4 class="font-normal text-gray-500 uppercase py-3 mr-8">
                <router-link
                  :to="{
                    name: 'searchRequestRoute',
                    params: { id: category.value }
                  }"
                >
                  {{ category.label }}
                </router-link>
              </h4>
              <div
                v-for="(option, index) in category.options"
                :key="option.id + '-option' + index"
              >
                <h5 class="font-medium py-1 mr-8 hover:underline">
                  <router-link
                    :to="{
                      name: 'searchRequestRoute',
                      params: { id: option.value }
                    }"
                  >
                    {{ option.label }}
                  </router-link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template else>
      <div class="bg-white h-screen flex flex-grow flex-row justify-center">
        <div class="w-full">
          <div class="border-b flex items-center mb-4" style="height:50px">
            <img src="@/assets/chevron-l.svg" class="mx-4" />
            <h1
              @click="shift(100)"
              class="pt-1 text-lg tracking-wide font-semibold uppercase"
            >
              {{ selectedNavigation.label }}
            </h1>
          </div>

          <div
            class="text-base tracking-widest py-3 ml-16"
            v-for="(group, index) in selectedNavigation.groups"
            :key="group.id + '-group' + index"
          >
            <h3 class="">
              <router-link
                :to="{
                  name: 'searchRequestRoute',
                  params: { id: group.value }
                }"
              >
                {{ group.label }}
              </router-link>
              <img src="@/assets/chevron-r.svg" class="float-right mr-6" />
            </h3>
            <!-- flex flex-row -->
            <div class="inline">
              {{ group.label }}
              <div
                v-for="(category, index) in group.categories"
                :key="category.id + '-category' + index"
              >
                <div
                  :style="`left:${shifted}%`"
                  v-for="(option, index) in category.options"
                  :key="option.id + '-option' + index"
                >
                  <h5 class="">
                    <router-link
                      :to="{
                        name: 'searchRequestRoute',
                        params: { id: option.value }
                      }"
                    >
                      {{ option.label }}
                    </router-link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "FlyOutMenu",
  props: [
    "navbarMode",
    "featuredNavigation",
    "selectedNavigation",
    "shift",
    "shifted"
  ]
};
</script>
