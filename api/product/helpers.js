const { catalogModel } = require("./models.js");

const getGroupByName = function (name) {
  return catalogModel.groups.filter((group) => group.name === name)[0];
};

// RENAME TO RANDOM INDEX
const getIndex = function (arr = null) {
  if (arr === null) return console.error("You must pass an array");
  return Math.floor(Math.random() * arr.length);
};

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getOption = function (name) {
  return getGroupByName(name).options[getIndex(getGroupByName(name).options)];
};

const getRandomSlice = function (arr = []) {
  if (!Array.isArray(arr)) return console.error("You must pass an Array");
  let shuffled = null;
  shuffled = (arr) => {
    return arr
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };
  return shuffled(arr).slice(getIndex(arr));
};

const repeat = function (func, times) {
  func(times);
  times && --times && repeat(func, times);
};

module.exports = {
  getGroupByName: getGroupByName,
  getRandomNumberBetween: getRandomNumberBetween,
  getOption: getOption,
  getIndex: getIndex,
  getRandomSlice: getRandomSlice,
  repeat: repeat,
};
