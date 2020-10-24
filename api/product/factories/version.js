const { colors } = require("../models.js");
const { make, random } = require("../helpers/index.js");
const { newDate } = require("./date.js");
const { newPrice } = require("./price.js");
const { newSizes } = require("./size.js");

const versionFactory = function ({
  id = null,
  product_id = null,
  dateRelease = null,
  color = null,
  price = null,
  sizes = null,
  imageUrl = null,
}) {
  return {
    id,
    product_id,
    dateRelease,
    color,
    price,
    sizes,
    imageUrl,
  };
};

const getColor = function () {
  return colors[random.numberBetween(0, colors.length)];
};

const newVersion = function (versionId, productId) {
  return versionFactory({
    id: versionId,
    product_id: productId,
    dateRelease: newDate(),
    color: getColor(),
    price: newPrice(),
    sizes: newSizes(),
    imageUrl: {
      small:
        "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
      medium:
        "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial",
    },
  });
};

const newVersions = function (productId) {
  let result = [];
  make.repeat(function (times) {
    result.push(newVersion(times, productId));
  }, random.numberBetween(1, 6));
  return result.sort(function (a, b) {
    return a.id - b.id;
  });
};

module.exports = {
  newVersion: newVersion,
  newVersions: newVersions,
};
