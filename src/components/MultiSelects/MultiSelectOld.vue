<template>
  <div class="">
    <div class="">
      <div
        class="relative inline-block mx-2"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <button
          class="outline-none relative z-10 border border-black px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
          :style="hover ? 'border-bottom-color:white' : ''"
        >
          <span class="pr-1 font-semibold flex-1">Section</span>
          <span>
            <svg
              class="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </span>
        </button>

        <div
          class="position-after-height absolute w-40 border-black outline-none border px-3 py-1 bg-white rounded-sm"
          :class="hover ? 'inline-block' : 'hidden'"
        >
          <ul class="px-1 pb-1">
            <li class="my-4">
              <label class="custom-label flex">
                <div
                  class="bg-transparent border-solid border-black w-6 h-6 p-1 flex justify-center items-center mr-3"
                  style="border-width: 1px"
                >
                  <input type="checkbox" class="hidden" />
                  <svg
                    class="hidden w-4 h-4 text-black pointer-events-none"
                    viewBox="0 0 172 172"
                  >
                    <g
                      fill="none"
                      stroke-width="none"
                      stroke-miterlimit="10"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style="mix-blend-mode:normal"
                    >
                      <path d="M0 172V0h172v172z" />
                      <path
                        d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                        fill="currentColor"
                        stroke-width="1"
                      />
                    </g>
                  </svg>
                </div>
                <span class="font-semibold select-none">Men</span>
              </label>
            </li>
            <li class="my-4">
              <label class="custom-label flex">
                <div
                  class="bg-white border-solid border-black w-6 h-6 p-1 flex justify-center items-center mr-3"
                  style="border-width: 1px"
                >
                  <input type="checkbox" class="hidden" checked />
                  <svg
                    class="hidden w-4 h-4 text-black pointer-events-none"
                    viewBox="0 0 172 172"
                  >
                    <g
                      fill="none"
                      stroke-width="none"
                      stroke-miterlimit="10"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style="mix-blend-mode:normal"
                    >
                      <path d="M0 172V0h172v172z" />
                      <path
                        d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                        fill="currentColor"
                        stroke-width="1"
                      />
                    </g>
                  </svg>
                </div>
                <span class="font-semibold select-none">Women</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSelectOld",
  props: ["selected"],
  data() {
    return {
      hover: false
    };
  }
};
</script>
<style scoped>
.position-after-height {
  top: calc(100% - 2px);
}
.custom-label input:checked + svg {
  display: block !important;
}
</style>
