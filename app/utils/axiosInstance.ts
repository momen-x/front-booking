import { queryClient } from "../_providers/react-query-provider";
import { API_DOMAIN } from "./constance";

import axios from "axios";

const api = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error) {
      queryClient.removeQueries({ queryKey: ["me"] });
    }
    return Promise.reject(error);
  },
);

export default api;
