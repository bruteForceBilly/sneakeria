/* eslint-disable no-unused-vars */
import axios from "axios";
import { API_PRODUCTS } from "@/constants";
import { API_VERSIONS } from "@/constants";
// Refactor so it also takes an option var called o to link it to the right if
// Route, Filter, Slice, Sort, Full-text search

const API_LEGEND = {
  section: "product",
  category: "product",
  campaigns: "product",
  productType: "product",
  styleType: "product",
  look: "product",
  brand: "product",
  color: "version",
  price_min: "operator",
  price_max: "operator",
};

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
  } else if (o === "filter") {
    let qObjectified = q.split("&").reduce(function (acc, cv) {
      let arr = cv.split("=");
      acc[arr[0]] = arr[1];
      return acc;
    }, {});
    console.log("product service Q PRODUCTS", qObjectified);
    //let { product, version, operator } = q;

    let qStrings = Object.entries(qObjectified).reduce(
      function (acc, cv, i, arr) {
        let [key, value] = cv;

        if (API_LEGEND[key] === "product") {
          acc.product += `${key}=${value}&`;
        }

        if (API_LEGEND[key] === "version") {
          acc.version += `${key}=${value}&`;
        }

        if (API_LEGEND[key] === "operator") {
          acc.operator += `${key}=${value}&`;
        }

        return acc;
      },
      { product: "", version: "", operator: "" }
    );

    let { product, version, operator } = qStrings;

    let prodResp;

    return axios
      .get(API_PRODUCTS + "?" + product)
      .then((response) => {
        prodResp = response.data;
        //console.log("prodResp", prodResp);
        return response.data
          .map((cv) => cv.id)
          .reduce(function (acc, cv) {
            acc += `productId=${cv}&`;
            return acc;
          }, "");
      })
      .then((response) => {
        let ver = version != undefined ? version : "";
        let op = operator != undefined ? operator : "";
        return axios
          .get(API_VERSIONS + "?" + response + ver + op)
          .then((response) => {
            let verResp = response.data;
            prodResp.forEach((cv) => (cv["versions"] = []));

            prodResp.forEach((product) => {
              product.versionIds.forEach((versionId) => {
                verResp.forEach((version) => {
                  if (version.id === versionId) {
                    product.versions.push(version);
                  }
                });
              });
            });

            let res = prodResp.filter((prod) => prod.versions.length > 0);

            console.log("SING HALLELUJAH", res);
            return cb(res);
          });
      })
      .catch((err) => err.toString());
  }
}
