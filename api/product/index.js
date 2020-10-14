const { newProduct } = require("./factories/product.js");
const util = require("util");

let test = newProduct(1);

console.log(util.inspect(test));
