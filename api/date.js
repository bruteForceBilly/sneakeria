const { randomNumberBetween } = require("./helpers.js");

const generateRandomParameters = function () {
  let dd = randomNumberBetween(1, 31);
  let mm = randomNumberBetween(0, 12);
  let yyyy = randomNumberBetween(2021, 2019);
  return {
    dd: dd,
    mm: mm,
    yyyy: yyyy,
  };
};

const dateFactory = function ({ dd, mm, yyyy }) {
  let date = new Date(yyyy, mm, dd);
  return date.toISOString().split("T")[0];
};

const newDate = () => dateFactory(generateRandomParameters());

module.exports = {
  newDate: newDate,
};
