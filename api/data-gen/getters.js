const { group, option, productType, styleType } = require("./data.js");

const byKeyValue = function (data, key, value) {
  return data.filter((cv) => cv[key] === value);
};

const groupOptions = function (groupName) {
  return byKeyValue(
    option,
    "groupId",
    byKeyValue(group, "name", groupName)
      .map((cv) => cv.id)
      .pop()
  );
};

const optionProductTypes = function (optionName) {
  return byKeyValue(
    productType,
    "optionId",
    byKeyValue(option, "name", optionName)
      .map((cv) => cv.id)
      .pop()
  );
};

const productTypeStyleTypes = function (productTypeName) {
  return byKeyValue(
    styleType,
    "productTypeId",
    byKeyValue(productType, "name", productTypeName)
      .map((cv) => cv.id)
      .pop()
  );
};

module.exports = {
  byKeyValue: byKeyValue,
  groupOptions: groupOptions,
  optionProductTypes: optionProductTypes,
  productTypeStyleTypes: productTypeStyleTypes,
};
