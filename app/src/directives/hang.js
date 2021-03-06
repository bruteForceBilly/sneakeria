import debounce from "lodash/debounce";

const offset = function (el) {
  var rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
};

const scrollHandler = function (el, binding, vnode, yPostionScroll) {
  let yPostionEl = offset(el);

  if (yPostionScroll > yPostionEl && !vnode.context._data[binding.value]) {
    vnode.context._data[binding.value] = true;
  }

  if (yPostionScroll < 400) {
    vnode.context._data[binding.value] = false;
  }
};

export default {
  bind(el, binding, vnode) {
    window.addEventListener(
      "scroll",
      debounce(() => scrollHandler(el, binding, vnode, window.scrollY), 100, {
        leading: true,
      })
    );
  },
  inserted(el, binding, vnode) {
    vnode.context._data.hangHeight = el.parentNode.clientHeight;
    //console.log(vnode.context._data.hangHeight);
  },
  unbind(el, binding, vnode) {
    window.removeEventListener(
      "scroll",
      debounce(() => scrollHandler(el, binding, vnode), 100, {
        leading: true,
      })
    );
  },
};
