const { catalog } = require("../models.js");

const groupByName = function (name) {
  return catalog.groups.filter((group) => group.name === name)[0];
};

const lastDeepChild = function (n, q) {
  let result = [];
  const run = function (n, q) {
    if (Array.isArray(n)) {
      return n.forEach((cv) => {
        result.push(cv);
        run(cv, q);
      });
    }
    if (q in n) {
      return run(n[q], q);
    } else {
      return;
    }
  };
  run(n, q);
  return result.pop();
};

module.exports = {
  groupByName: groupByName,
  lastDeepChild: lastDeepChild,
};
