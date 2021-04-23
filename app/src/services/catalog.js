import axios from "axios";
import { API_CATALOG } from "@/constants";

export default function () {
  return axios
    .get(API_CATALOG)
    .then((response) => response.data)
    .catch((err) => err.toString());
}
