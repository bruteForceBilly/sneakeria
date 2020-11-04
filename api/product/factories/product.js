/* eslint-disable no-unused-vars */
const { make, random, getters } = require("../helpers/index.js");
const { newVersions } = require("./version.js");
const { newOption } = require("./option.js");

const productFactory = function ({
  id = null,
  name = null,
  section = null,
  campaigns = null,
  category = null,
  look = null,
  brand = null,
  versions = null,
}) {
  const nameFactory = function (arg, type) {
    if (Array.isArray(arg) && type === Array) {
      let result = arg.map((cv) => cv.name);
      return result;
    } else if (Array.isArray(arg) && type === String) {
      let result = arg.map((cv) => cv.name);
      return result.shift();
    } else {
      return arg.name;
    }
  };

  name = brand.name + " product";
  section = nameFactory(section, String);
  campaigns = nameFactory(campaigns, Array);
  category = nameFactory(category, String);
  look = nameFactory(look, String);
  brand = nameFactory(brand, String);
  return {
    id,
    name,
    section,
    campaigns,
    category,
    look,
    brand,
    versions,
  };
};

const newProduct = (n) =>
  productFactory({
    id: n,
    section: random.childFromParentsChildren("section", "options"),
    campaigns: random.sliver(getters.groupByName("campaigns").options),
    category: newOption("category", "attributes"),
    look: newOption("look", "attributes"),
    brand: random.childFromParentsChildren("brand", "options"),
    versions: newVersions(n),
  });

const newProducts = function (n) {
  let result = [];
  make.repeat(function (n) {
    return result.push(newProduct(n));
  }, n);
  return result.sort(function (a, b) {
    return a.id - b.id;
  });
};

module.exports = {
  newProducts: newProducts,
};
