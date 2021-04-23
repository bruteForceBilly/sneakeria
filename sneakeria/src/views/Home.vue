<template>
  <div class="h-screen flex justify-center ">
    <div class="text-lg mt-12 pt-10 md:pt-24 px-4 md:px-60 xl:px-0 xl:w-1/4 leading-relaxed">
      <h1 class="text-xl font-semibold tracking-wide mb-3">👋 Hello there!</h1>
      <p>
        Welcome to Sneakeria, a <i>sneaky</i> copy of the adidas <a class="underline text-blue-500 visited:text-purple-600" href="https://www.adidas.nl/blauw" target="_blank" title="Check out Adidas catalog page for comparison">catalog page</a>, reverse
        engineered and built in vue.js, json-server, tailwind and dockerized with docker
        compose. Deployed to a digital ocean droplet. Product data is seeded from a homegrown data generation tool run
        by node.js. Click on {{ getSuggestion }} to get started, or why
        not just check out all <router-link to="/blue" class="underline text-blue-500 visited:text-purple-600">blue</router-link> products?
      </p>
      <br>
      <p>If you like what you see and are looking for a frontender to hire, feel free to <a class="underline text-blue-500" href="mailto:bruteForceBilly@protonmail.com">reach out!</a></p>
      <br>
      <p class="leading-loose mb-4">Kind Regards,<br>bruteForceBilly</p>
      <p class="text-sm">
        <a href="https://github.com/bruteForceBilly" target="_blank" class="underline text-blue-500 visited:text-purple-600">Github</a><span class="mx-2 text-blue-500 visited:text-purple-600">|</span><a href="https://www.linkedin.com/in/wsaidac/" target="_blank" class="underline text-blue-500">LinkedIn</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    isMobileScreen() {
      return this.$mq == "sm" ? true : false;
    },
    getSuggestion() {
      return this.isMobileScreen ? "menu in the upper left corner" : "one of the link in the navbar";
    }
  },
};
</script>

