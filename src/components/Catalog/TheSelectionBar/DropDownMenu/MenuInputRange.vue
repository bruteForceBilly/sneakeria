<template>
  <div><input type="range" v-model="option.value" /> {{ option.value }}</div>
</template>

<script>
/*

   class="bg-transparent border-solid border-black w-6 h-6 p-1 flex justify-center items-center mr-3"
    :class="option.checked ? 'bg-black' : 'bg-white'"
    style="border-width: 1px"

*/

export default {
  name: "MenuInputRange",
  props: {
    option: Object,
    item: Object,
  },
};
</script>

<style scoped>
input[type="range"] {
  width: 100%;
  margin: 9px 0;
  background-color: transparent;
  -webkit-appearance: none;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  background: rgba(48, 113, 169, 0);
  border: 0.5px solid #010101;
  border-radius: 1.3px;
  width: 100%;
  height: 8px;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
  margin-top: -9.5px;
  width: 26px;
  height: 26px;
  background: #ffffff;
  border: 1.8px solid #000000;
  border-radius: 39px;
  cursor: pointer;
  -webkit-appearance: none;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #bed7ec;
}
input[type="range"]::-moz-range-track {
  background: rgba(48, 113, 169, 0);
  border: 0.5px solid #010101;
  border-radius: 1.3px;
  width: 100%;
  height: 8px;
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  width: 26px;
  height: 26px;
  background: #ffffff;
  border: 1.8px solid #000000;
  border-radius: 39px;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 9px 0;
  color: transparent;
  width: 100%;
  height: 8px;
  cursor: pointer;
}
input[type="range"]::-ms-fill-lower {
  background: #020406;
  border: 0.5px solid #010101;
  border-radius: 2.6px;
}
input[type="range"]::-ms-fill-upper {
  background: rgba(48, 113, 169, 0);
  border: 0.5px solid #010101;
  border-radius: 2.6px;
}
input[type="range"]::-ms-thumb {
  width: 26px;
  height: 26px;
  background: #ffffff;
  border: 1.8px solid #000000;
  border-radius: 39px;
  cursor: pointer;
  margin-top: 0px;
  /*Needed to keep the Edge thumb centred*/
}
input[type="range"]:focus::-ms-fill-lower {
  background: rgba(48, 113, 169, 0);
}
input[type="range"]:focus::-ms-fill-upper {
  background: #bed7ec;
}
/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align: auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  input[type="range"] {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}
</style>
