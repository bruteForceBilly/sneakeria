import debounce from "lodash/debounce";

const offset = function (el) {
  var rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
};

const scrollHandler = function (el, binding) {
  let yPostionEl = offset(el);

  let yPostionScroll = window.scrollY;
  console.log("yPostionScroll", yPostionScroll);

  if (yPostionScroll > yPostionEl) {
    el.classList.add(binding.value);
  }

  if (yPostionScroll === 0) {
    console.log("yPostionScroll is zero", yPostionScroll);
    el.classList.remove(binding.value);
  }
};

export default {
  bind(el, binding) {
    window.addEventListener(
      "scroll",
      debounce(() => scrollHandler(el, binding), 200, {
        leading: true,
      })
    );
  },
  unbind(el, binding) {
    window.removeEventListener(
      "scroll",
      debounce(() => scrollHandler(el, binding), 200, {
        leading: true,
      })
    );
  },
};
