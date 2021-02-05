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

    let operatorWithPage = operator.match(page);
    operatorWithPage += "&" + operator.match(limit);

    let operatorWithoutPage = operator.replace(page, "");
    operatorWithoutPage = operatorWithoutPage.replace(limit, "");

    return axios
      .get(API_PRODUCTS + "?" + product + operatorWithoutPage)
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
          apiVersionsQuery += "&" + operatorWithoutPage;
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
          const contentStart =
            pageCurrent == 1 ? 0 : pageCurrent * contentLimit;
          const contentCount = data.length;
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

        return cb(paginatedProducts);
      });
  }
}
