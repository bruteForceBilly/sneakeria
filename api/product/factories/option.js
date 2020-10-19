const { getGroupByName } = require("../helpers.js");

const QUERY = "attributes";

const pickRandomAttribute = function (n, q) {
  let root = [];
  let arr = n;
  const run = function (n, q) {
    if (root.length < 1) {
      root.push(n);
    }
    if (Array.isArray(n)) {
      arr = n;
      let index = Math.floor(Math.random() * (n.length - 1 + 1) + 0);
      let el = n[index];
      n.splice(0, n.length, el);
      return n.forEach((i) => run(i, q));
    }
    if (q in n) {
      return run(n[q], q);
    } else {
      if (arr.length > 0) {
        let index = Math.floor(Math.random() * (arr.length - 1 + 1) + 0);
        let el = arr[index];
        arr.splice(0, arr.length, el);
      }
      return;
    }
  };

  run(n, q);
  return root.pop();
};

const optionFactory = function (name) {
  let options = getGroupByName(name).options;
  let index = Math.floor(Math.random() * (options.length - 1 + 1) + 0);
  let el = options[index];
  options.splice(0, options.length, el);
  return options.reduce(function (acc, cv) {
    acc.push(pickRandomAttribute(cv, QUERY));
    return acc;
  }, []);
};

const newOption = (name) => optionFactory(name);

module.exports = {
  newOption: newOption,
};
