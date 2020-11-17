const fs = require("fs");

const { newProducts } = require("./product.js");
const { catalog } = require("./data.js");

let output = {
  site: catalog.groups,
  products: newProducts(399),
};

let outputJson = JSON.stringify(output);

const writeJson = function (jsonData, destFileName) {
  return fs.writeFile(destFileName, jsonData, function (err) {
    if (err) return console.log(err);
    console.log("wrote " + destFileName);
  });
};

writeJson(outputJson, "db.json");
