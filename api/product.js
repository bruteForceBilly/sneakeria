const data = require("./data.js");

const {
  groupOptions,
  optionProductTypes,
  productTypeStyleTypes,
} = require("./getters.js");

const { repeat, randomElement, randomSliver } = require("./helpers.js");
const { newVersions } = require("./version.js");

const productFactory = function ({
  id,
  section,
  campaigns,
  category,
  look,
  brand,
  versions,
}) {
  section = section.name;
  campaigns = campaigns.map((campaign) => campaign.name);

  let getRandomProductType = function (arg) {
    return randomElement(optionProductTypes(arg.name));
  };

  let getRandomStyleType = function (arg) {
    return randomElement(productTypeStyleTypes(arg));
  };

  let productType = getRandomProductType(category).name;
  let styleType = (arg) => {
    let res = getRandomStyleType(arg);
    return res && res.name ? res.name : null;
  };

  category = category.name;
  styleType = styleType(productType);

  let ver = newVersions(id);

  data.versions.push(ver);

  return {
    id,
    section,
    campaigns,
    category,
    productType,
    styleType,
    look,
    brand,
  };
};

const newProduct = (n) =>
  productFactory({
    id: n,
    section: randomElement(groupOptions("section")),
    campaigns: randomSliver(groupOptions("campaigns")),
    category: randomElement(groupOptions("category")),
    look: randomElement(groupOptions("look")).name,
    brand: randomElement(groupOptions("brand")).name,
  });

const newProducts = function (n) {
  let result = [];

  repeat(function (n) {
    return result.push(newProduct(n));
  }, n);

  return result.sort(function (a, b) {
    return a.id - b.id;
  });
};

module.exports = {
  newProducts: newProducts,
};
