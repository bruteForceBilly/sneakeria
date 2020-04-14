import axios from "axios";
import { API_SITE } from "@/constants";

export default {
  get() {
    return axios
      .get(API_SITE)
      .then(response => {
        return response.data;
      })
      .catch(err => err.toString());
  }
};
