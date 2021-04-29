<template>
  <div class="h-screen flex justify-center ">
    <div class="text-lg mt-12 pt-10 md:pt-24 px-4 md:px-0 md:w-1/2 xxl:w-2/6 leading-relaxed">
      <h1 class="text-xl font-semibold tracking-wide mb-3">👋 Hi!</h1>
      <p>
        Welcome to Sneakeria, an ecommerce example app that I carefully crafted after the Adidas <a class="underline text-blue-500 visited:text-purple-600" href="https://www.adidas.nl/blauw" target="_blank" title="Check out Adidas catalog page for comparison">catalog page</a>.
        The purpose of this project was to create an environment that facilitates exploration of more advanced patterns in Vue.js. Product data is seeded from a homegrown data generation tool run by node.js and served by json-server. Tailwind is used for styling the UI. Deployment is done via docker compose to a digital ocean droplet. The project's github repository can be found
        <a class="underline text-blue-500 visited:text-purple-600" href="https://github.com/bruteForceBilly/sneakeria" target="_blank" title="Github">here</a>.
      </p>
      <br>
      <div v-if="this.$mq == 'sm'">
        <p>Toggle the sidebar menu in the upper left corner to start exploring the app, or click this <router-link to="/blue" class="underline text-blue-500 visited:text-purple-600">link</router-link>.
        <br>
        <img src="@/assets/sb.gif" class="mx-auto mt-10 mb-12 w-4/6">
        </p>
      </div>
      <div v-else>
        <p>Click on one of the links on the header to start exploring the app, or why not just check out all <router-link to="/blue" class="underline text-blue-500 visited:text-purple-600">blue</router-link> products?</p>
        <br>
      </div>

      <p>If you're looking for a front-end web developer that specializes in vue, with javascript experience from several scale-ups, please <a class="underline text-blue-500" href="mailto:bruteForceBilly@protonmail.com">reach out</a>.</p>
      <br>
      <p class="leading-loose mb-4">Best Regards,<br>William</p>
      <p class="text-sm">
        <a href="https://github.com/bruteForceBilly" target="_blank" class="underline text-blue-500 visited:text-purple-600">Github</a><span class="mx-2 text-blue-500 visited:text-purple-600">|</span><a href="https://www.linkedin.com/in/wsaidac/" target="_blank" class="underline text-blue-500">LinkedIn</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

