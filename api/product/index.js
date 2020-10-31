const fs = require("fs");
const { newProducts } = require("./factories/product.js");
const { site, catalog } = require("./models.js");

let output = {
  site: site.groups,
  catalog: catalog.groups,
  products: newProducts(399),
};

let outputJson = JSON.stringify(output);

const writeJson = function (jsonData, destFileName) {
  return fs.writeFile(destFileName, jsonData, function (err) {
    if (err) return console.log(err);
    console.log("wrote " + destFileName);
  });
};

writeJson(outputJson, "output.json");
