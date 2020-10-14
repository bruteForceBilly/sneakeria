const { catalogModel } = require("./models.js");

const findByName = function (name) {
  return catalogModel.groups.filter((group) => group.name === name)[0];
};

const pickIndex = function (arr = null) {
  if (arr === null) return console.error("You must pass an array");
  return Math.floor(Math.random() * arr.length);
};

const pickOption = function (name) {
  return findByName(name).options[pickIndex(findByName(name).options)];
};

const randomSlice = function (arr = []) {
  if (!Array.isArray(arr)) return console.error("You must pass an Array");
  let shuffled = null;
  shuffled = (arr) => {
    return arr
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };
  return shuffled(arr).slice(pickIndex(arr));
};

// make(n)(factory)
const make = function (amount) {
  return function (thing) {
    if (!(thing instanceof Function))
      return console.error("Thing not a function");
    let arr = [];
    for (let i = 0; i < amount; i++) {
      arr.push(thing());
    }
    return arr;
  };
};

module.exports = {
  findByName: findByName,
  pickOption: pickOption,
  pickIndex: pickIndex,
  randomSlice: randomSlice,
  make: make,
};
