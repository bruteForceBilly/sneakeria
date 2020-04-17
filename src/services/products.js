import axios from "axios";
import { API_PRODUCTS } from "@/constants";

export default function(q, cb) {
  console.log("API_PRODUCTS ran", q);
  return axios
    .get(API_PRODUCTS + "/?" + q)
    .then(response => cb(response.data))
    .catch(err => err.toString());
}
