const {
  repeat,
  getGroupByName,
  getOption,
  getRandomSlice,
} = require("../helpers.js");
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
  const getName = function (n) {
    const QUERY = "attributes";
    let names = [];
    const run = function (n, q) {
      if (Array.isArray(n)) {
        return n.forEach((cv) => {
          names.push(cv.name);
          run(cv, q);
        });
      }
      if (q in n) {
        return run(n[q], q);
      } else {
        return n.name;
      }
    };
    run(n, QUERY);
    return names[names.length - 1];
  };
  let nameResult = brand.name + " " + getName(look) + " " + getName(category);
  name = nameResult.toLowerCase();
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
    section: getOption("section"),
    campaigns: getRandomSlice(getGroupByName("campaigns").options),
    category: newOption("category"),
    look: newOption("look"),
    brand: getOption("brand"),
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
