const fs = require("fs");
const { newProducts } = require("./product.js");
const { catalog, versions, navigation } = require("./data.js");

let output = {
  catalog: catalog,
  navigation: navigation,
  products: newProducts(399),
  versions: versions.flat(),
};

let outputJson = JSON.stringify(output);

const writeJson = function (jsonData, destFileName) {
  return fs.writeFile(destFileName, jsonData, function (err) {
    if (err) return console.log(err);
    //console.log("wrote " + destFileName);
  });
};

writeJson(outputJson, "db.json");
