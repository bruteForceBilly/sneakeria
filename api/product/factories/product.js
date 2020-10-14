const { findByName, pickOption, randomSlice } = require("../helpers.js");

const productFactory = function ({
  id = null,
  name = null,
  section = null,
  campaigns = null,
  category = null,
  look = null,
  brand = null,
}) {
  name = `${brand.name} ${look.name} product no: ${id}`;
  return {
    id,
    name,
    section,
    campaigns,
    category,
    look,
    brand,
  };
};

const newProduct = (n) =>
  productFactory({
    id: n,
    section: pickOption("section"),
    campaigns: randomSlice(findByName("campaigns").options),
    category: pickOption("category"),
    look: pickOption("look"),
    brand: pickOption("brand"),
  });

module.exports = {
  newProduct: newProduct,
};
