/* eslint-disable no-unused-vars */
import axios from "axios";
import { API_PRODUCTS } from "@/constants";
import { API_VERSIONS } from "@/constants";
import store from "@/store/index.js";

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
          apiVersionsQuery += "&" + operatorWithoutPagination;
        }

        //console.log("apiVersionsQuery", apiVersionsQuery);

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
            let elementPosition = apiAllVersionsResponse.findIndex(
              (version) => version.id === versionId
            );
            ver = apiAllVersionsResponse[elementPosition];
            product.versions.push(ver);
          });
        });

        const paginator = (data, operator) => {
          let operatorParams = operator.split("&");

          const pageParams = operatorParams.reduce((acc, cv) => {
            const page = /_page=\d+/g;
            const limit = /_limit=\d+/g;

            if (page.test(cv)) {
              acc.pageCurrent = parseInt(cv.match(/\d+/g)[0], 10);
            } else if (limit.test(cv)) {
              acc.contentLimit = parseInt(cv.match(/\d+/g)[0], 10);
            }

            return acc;
          }, {});

          const { pageCurrent, contentLimit } = pageParams;
          const contentCount = data.length;
          const getContentStart = () => {
            if (pageCurrent == 1) {
              return 0;
            } else {
              if (pageCurrent * contentLimit > contentCount) {
                return (
                  contentLimit -
                  (contentLimit - contentCount) +
                  (contentLimit - contentCount)
                );
              } else {
                return pageCurrent * contentLimit;
              }
            }
          };

          const contentStart = getContentStart();

          const contentEnd =
            contentStart + contentLimit > contentCount
              ? contentCount
              : contentStart + contentLimit;

          const pageCount = Math.ceil(contentCount / contentLimit);
          const pagePrevious = pageCurrent > 1 ? pageCurrent - 1 : 1;
          const pageNext =
            pageCurrent < pageCount ? pageCurrent + 1 : pageCount;

          return {
            pageCount,
            pageCurrent,
            pageNext,
            pagePrevious,
            contentLimit,
            contentCount,
            contentStart,
            contentEnd,
          };
        };

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
    const { product, version = null } = q;

    // first get the versions
    // then get the products of found versions

    console.log("fetch", product, version);

    let makeQuery = (arr) =>
      arr.reduce((acc, cv) => {
        acc += `id=${cv}&`;
        return acc;
      }, "");

    let versionQuery = makeQuery(version);

    let apiProductResponse = [];
    let apiVersionResponse = [];
    let apiAllVersionsResponse = [];

    return axios
      .get(API_VERSIONS + "?" + versionQuery)
      .catch(function (error) {
        console.log("API_VERSIONS error:", error);
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
            console.log("API_PRODUCTS ALL error:", error);
          })
          .then((response) => {
            apiProductResponse = response.data;
          });
      })
      .then(() => {
        //apiProductResponse DONE, apiVersionResponse DONE, apiAllVersionsResponse;

        let foundProducts = apiProductResponse.reduce((result, product) => {
          product["versions"] = [];
          product.versionIds.forEach((id) => {
            let version = apiVersionResponse.filter((ver) => ver.id === id);
            product.versions.push(version);
          });
          result.push(product);
          return result;
        }, []);

        return cb(foundProducts);
      });
  }
}
