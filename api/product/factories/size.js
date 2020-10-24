const { make, random } = require("../helpers/index.js");

const generateRandomParameters = function (n) {
  let size = n + 36;
  let stockAvailability = random.numberBetween(0, 3) > 1 ? true : false;
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
  make.repeat(function (n) {
    result.push(newSize(n));
  }, 8);
  return result.sort(function (a, b) {
    return a.size - b.size;
  });
};

module.exports = {
  newSizes: newSizes,
};
