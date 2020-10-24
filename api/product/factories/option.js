/* eslint-disable no-unused-vars */

const { random, getters } = require("../helpers/index.js");

const optionFactory = function (name, query) {
  let options = getters.groupByName(name).options;
  let index = Math.floor(Math.random() * (options.length - 1 + 1) + 0);
  let el = options[index];
  options.splice(0, options.length, el);

  return options.reduce(function (acc, cv) {
    acc.push(random.deepChild(cv, query));
    return acc;
  }, []);
};

const newOption = (name, query) => optionFactory(name, query);

module.exports = {
  newOption: newOption,
};
