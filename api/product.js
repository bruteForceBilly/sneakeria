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

  let getRandomProductType = function () {
    return randomElement(optionProductTypes(this.name)).name;
  };

  let getRandomStyleType = function (arg) {
    return randomElement(productTypeStyleTypes(arg));
  };

  category = {
    name: category.name,
    productType: getRandomProductType.call(category),
    get styleType() {
      let res = getRandomStyleType(this.productType);
      return res && res.name ? res.name : null;
    },
  };

  return {
    id,
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
    section: randomElement(groupOptions("section")),
    campaigns: randomSliver(groupOptions("campaigns")),
    category: randomElement(groupOptions("category")),
    look: randomElement(groupOptions("look")).name,
    brand: randomElement(groupOptions("brand")).name,
    versions: newVersions(n),
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
