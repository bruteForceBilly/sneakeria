const { repeat, randomNumberBetween } = require("./helpers.js");

const generateRandomParameters = function (n) {
  let size = n + 36;
  let stockAvailability = randomNumberBetween(0, 3) > 1 ? true : false;
  return {
    size: size,
    stockAvailability: stockAvailability,
  };
};

const sizeFactory = function ({ size, stockAvailability }) {
  return {
    size,
    stockAvailability,
  };
};

const newSize = (n) => sizeFactory(generateRandomParameters(n));

const newSizes = function () {
  let result = [];
  repeat(function (n) {
    result.push(newSize(n));
  }, 8);
  return result.sort(function (a, b) {
    return a.size - b.size;
  });
};

module.exports = {
  newSizes: newSizes,
};
