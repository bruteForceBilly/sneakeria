var config = require("./jest.config");
config.testRegex = "uspec\\.js$"; //Overriding testRegex option
console.log("RUNNING INTEGRATION TESTS");
module.exports = config;
