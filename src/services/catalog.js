import axios from "axios";
import { API_CATALOG } from "@/constants";

export default function (cb) {
  return axios
    .get(API_CATALOG)
    .then((response) => cb(response.data))
    .catch((err) => cb(err.toString()));
}
