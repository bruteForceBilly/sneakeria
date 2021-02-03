/* eslint-disable no-unused-vars */
import axios from "axios";
import { API_PRODUCTS } from "@/constants";
import { API_VERSIONS } from "@/constants";
// Refactor so it also takes an option var called o to link it to the right if
// Route, Filter, Slice, Sort, Full-text search

export default function (o, q, cb) {
  if (o === "route" && q === "all") {
    //console.log("ALL PRODUCTS", q);
    return axios
      .get(API_PRODUCTS)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => err.toString());
  } else if (o === "route") {
    //console.log("product id hit");
    return axios
      .get(API_PRODUCTS + "/" + q)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => err.toString());
  } else if (o === "search") {
    const { product, version = null, operator = null } = q;
    let apiProductResponse = [];
    let apiVersionResponse = [];
    let apiAllVersionsResponse = [];

    return axios
      .get(API_PRODUCTS + "?" + product)
      .catch(function (error) {
        console.log("API_PRODUCTS error:", error);
      })
      .then((response) => {
        apiProductResponse = response.data;

        let apiVersionProductIdsParam = response.data
          .map((cv) => cv.id)
          .reduce(function (acc, cv) {
            acc += `productId=${cv}&`;
            return acc;
          }, "")
          .slice(0, -1);

        return apiVersionProductIdsParam;
      })
      .then((response) => {
        let apiVersionsQuery = "?";

        apiVersionsQuery += response;

        if (version !== null) {
          apiVersionsQuery += "&" + version;
        }

        if (operator !== null) {
          apiVersionsQuery += "&" + operator;
        }

        //console.log(apiVersionsQuery);

        return axios
          .get(API_VERSIONS + apiVersionsQuery)
          .catch(function (error) {
            console.log("API_VERSIONS error:", error);
          })
          .then((response) => {
            apiVersionResponse = response.data;
          });
      })
      .then((response) => {
        return axios
          .get(API_VERSIONS)
          .catch(function (error) {
            console.log("API_VERSIONS ALL error:", error);
          })
          .then((response) => {
            apiAllVersionsResponse = response.data;
          });
      })
      .then(() => {
        //apiProductResponse, apiVersionResponse, apiAllVersionsResponse;

        let foundVersionsProductIds = [
          ...new Set(apiVersionResponse.map((version) => version.productId)),
        ];

        let filteredProducts = [...apiProductResponse].filter((product) =>
          foundVersionsProductIds.includes(product.id)
        );

        filteredProducts.forEach((product) => {
          product["versions"] = [];
          product.versionIds.forEach((versionId) => {
            let ver;
            ver = apiAllVersionsResponse[versionId];
            product.versions.push(ver);
          });
        });

        console.log(filteredProducts);

        return cb(filteredProducts);
      });
  }
}
