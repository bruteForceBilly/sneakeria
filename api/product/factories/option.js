/* eslint-disable no-unused-vars */
const util = require("util");

const { random, getters } = require("../helpers/index.js");

let i = 0;
const optionFactory = function (name, query) {
  i++;

  let options = getters.groupByName(name).options;

  const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const r = (arg) => randomInt(0, arg.length);

  const findRandomElement = (arg) => {
    let q = r(arg);
    return arg.find((el, i) => q === i);
  };

  let el = () => findRandomElement(options);

  return random.deepChild(el(), query);
};

const newOption = (name, query) => {
  return optionFactory(name, query);
};

module.exports = {
  newOption: newOption,
};
