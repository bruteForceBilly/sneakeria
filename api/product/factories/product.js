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
  let productType;

  name = brand.name + " product";
  section = section.name;
  campaigns = campaigns.map((cv) => cv.name);
  brand = brand.name;
  return {
    id,
    name,
    section,
    campaigns,
    category,
    productType,
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
