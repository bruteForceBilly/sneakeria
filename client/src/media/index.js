import Vue from "vue";
import VueMq from "vue-mq";

const media = Vue.use(VueMq, {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
});

export default media;
