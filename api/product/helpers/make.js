const repeat = function (func, times) {
  func(times);
  times && --times && repeat(func, times);
};

module.exports = {
  repeat: repeat,
};
