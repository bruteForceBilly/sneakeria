//export const API_PRODUCTS = JSON.stringify(process.env.VUE_APP_API_PRODUCTS);

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://sneakeria-api.herokuapp.com/"
    : "http://localhost:3000";

export const API_PRODUCTS = API_BASE + "/products";
export const API_VERSIONS = API_BASE + "/versions";
export const API_CATALOG = API_BASE + "/catalog";
export const API_NAVIGATION = API_BASE + "/navigation";
