import axios from "axios";
import { API_SITE } from "@/constants";
import store from "@/store";

export default {
  getSiteMapData(cb) {
    store.dispatch({
      type: "siteMap/setSiteMapLoading",
      isLoading: true
    });

    axios
      .get(API_SITE)
      .then(response => cb(response.data))
      .catch(err =>
        store.dispatch({
          type: "siteMap/setSiteMapError",
          error: err.toString()
        })
      )
      .finally(() =>
        store.dispatch({
          type: "siteMap/setSiteMapLoading",
          isLoading: false
        })
      );
  }
};
