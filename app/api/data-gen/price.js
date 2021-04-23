const { randomNumberBetween } = require("./helpers.js");

const getAmountOffered = function (amountOrginal) {
  if (Math.random() < 0.4) {
    let int = parseInt(amountOrginal);
    let num = Math.floor(int / (Math.random() * (4 - 1) + 1));
    return num;
  } else {
    return amountOrginal;
  }
};

const getDiscount = function (amountOriginal, amountOffered) {
  let org = parseInt(amountOriginal);
  let off = parseInt(amountOffered);
  return org > off ? true : false;
};

const priceFactory = function ({ amountOriginal = null }) {
  let amountOffered = getAmountOffered(amountOriginal);
  let discount = getDiscount(amountOriginal, amountOffered);
  return {
    amountOriginal,
    amountOffered,
    discount,
  };
};

const newPrice = () =>
  priceFactory({
    amountOriginal: randomNumberBetween(45, 299),
  });

module.exports = {
  newPrice: newPrice,
};