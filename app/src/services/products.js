/* eslint-disable no-unused-vars */
import axios from "axios";
import { API_PRODUCTS } from "@/constants";
import { API_VERSIONS } from "@/constants";
import store from "@/store/index.js";
import paginator from "./util/paginator.js";

export default function (o, q, cb) {
  if (o === "all") {

    let apiProductResponse = [];
    let apiVersionResponse = [];
    let apiAllVersionsResponse = [];

    let operator = q;

    let operatorWithoutPagination = { ...q };
    delete operatorWithoutPagination._page;
    delete operatorWithoutPagination._limit;

    return axios
      .get(API_PRODUCTS)
      .catch(function (error) {
        //console.log("API_PRODUCTS error:", error);
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

        // if (version !== null) {
        //   apiVersionsQuery += "&" + version;
        // }

        if (operator !== null) {
          apiVersionsQuery += "&" + operatorWithoutPagination;
        }

        //console.log("apiVersionsQuery", apiVersionsQuery);

        return axios
          .get(API_VERSIONS + apiVersionsQuery)
          .catch(function (error) {
            //console.log("API_VERSIONS error:", error);
          })
          .then((response) => {
            apiVersionResponse = response.data;
          });
      })
      .then((response) => {
        return axios
          .get(API_VERSIONS)
          .catch(function (error) {
            //console.log("API_VERSIONS ALL error:", error);
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
            let elementPosition = apiAllVersionsResponse.findIndex(
              (version) => version.id === versionId
            );
            ver = apiAllVersionsResponse[elementPosition];
            product.versions.push(ver);
          });
        });

        const pagination = paginator(filteredProducts, operator);

        const paginatedProducts = filteredProducts.slice(
          pagination.contentStart,
          pagination.contentEnd
        );

        store.commit("search/foundProductsPagination", pagination);

        //console.log(apiProductResponse, apiVersionResponse, apiAllVersionsResponse)
        //console.log(filteredProducts, paginatedProducts, pagination);

        return cb(paginatedProducts);
      });



  } else if (o === "route") {
    //console.log("product id hit");
    return axios
      .get(API_PRODUCTS + "/" + q)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => err.toString());
  } else if (o === "search") {

    let apiProductResponse = [];
    let apiVersionResponse = [];
    let apiAllVersionsResponse = [];

    const { product, version = null, operator = null } = q;
    const page = /_page=\d+/g;
    const limit = /_limit=\d+/g;

    let operatorPage = operator.match(page);
    let operatorLimit = operator.match(limit);

    let operatorWithoutPagination = operator
      .replace(operatorPage, "")
      .replace(operatorLimit, "")
      .slice(2);

    return axios
      .get(API_PRODUCTS + "?" + product)
      .catch(function (error) {
        //console.log("API_PRODUCTS error:", error);
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
          apiVersionsQuery += "&" + operatorWithoutPagination;
        }

        //console.log("apiVersionsQuery", apiVersionsQuery);

        return axios
          .get(API_VERSIONS + apiVersionsQuery)
          .catch(function (error) {
            //console.log("API_VERSIONS error:", error);
          })
          .then((response) => {
            apiVersionResponse = response.data;
          });
      })
      .then((response) => {
        return axios
          .get(API_VERSIONS)
          .catch(function (error) {
            //console.log("API_VERSIONS ALL error:", error);
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
            let elementPosition = apiAllVersionsResponse.findIndex(
              (version) => version.id === versionId
            );
            ver = apiAllVersionsResponse[elementPosition];
            product.versions.push(ver);
          });
        });

        const pagination = paginator(filteredProducts, operator);

        const paginatedProducts = filteredProducts.slice(
          pagination.contentStart,
          pagination.contentEnd
        );

        store.commit("search/foundProductsPagination", pagination);

        //console.log(filteredProducts, paginatedProducts, pagination);

        return cb(paginatedProducts);
      });
  } else if (o === "fetch") {
    // first get the versions
    // then get the products of found versions

    /*
    let fetchQuery = [
      { "productId": 8, "versionId": 1343 },
      { "productId": 8, "versionId": 1344 },
    ]; */

    let makeQuery = (arr) =>
      arr.reduce((acc, cv) => {
        acc += `id=${cv}&`;
        return acc;
      }, "");

    let versionQuery = makeQuery(q.map((cv) => cv.versionId));

    let apiProductResponse = [];
    let apiVersionResponse = [];
    let apiAllVersionsResponse = [];

    return axios
      .get(API_VERSIONS + "?" + versionQuery)
      .catch(function (error) {
        //console.log("API_VERSIONS error:", error);
      })
      .then((response) => {
        apiVersionResponse = response.data;

        let apiVersionProductIdsParam = response.data
          .map((cv) => cv.productId)
          .reduce(function (acc, cv) {
            acc += `id=${cv}&`;
            return acc;
          }, "?")
          .slice(0, -1);

        return apiVersionProductIdsParam;
      })
      .then((response) => {
        return axios
          .get(API_PRODUCTS + response)
          .catch(function (error) {
            //console.log("API_PRODUCTS ALL error:", error);
          })
          .then((response) => {
            apiProductResponse = response.data;
          });
      })
      .then(() => {
        let foundVersions = apiVersionResponse.reduce((acc, cv) => {
          cv.product = {};
          apiProductResponse.forEach((product) => {
            if (product.id === cv.productId) {
              cv.product = product;
            }
          });
          acc.push(cv);
          return acc;
        }, []);

        return cb(foundVersions);
      });
  }
}
