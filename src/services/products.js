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
    const { product, version, operator } = q;
    let apiProductResponse = [];
    let apiVersionResponse = [];

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
          }, "");

        return apiVersionProductIdsParam;
      })
      .then((response) => {
        console.log("QUERY STRING", version, operator);
        return axios
          .get(API_VERSIONS + "?" + response + version + "&" + operator)
          .catch(function (error) {
            console.log("API_VERSIONS error:", error);
          })
          .then((response) => {
            apiVersionResponse = response.data;

            apiProductResponse.forEach((cv) => (cv["versions"] = []));

            apiProductResponse.forEach((product) => {
              product.versionIds.forEach((versionId) => {
                apiVersionResponse.forEach((version) => {
                  if (version.id === versionId) {
                    product.versions.push(version);
                  }
                });
              });
            });

            let res = apiProductResponse.filter(
              (prod) => prod.versions.length > 0
            );

            console.log("SING HALLELUJAH", res);

            return cb(res);
          });
      });
  }
}
