import { queryClient } from "../_providers/react-query-provider";
import { API_DOMAIN, CURRENT_USER_QUERY_KEY } from "./constance";

import axios from "axios";

const api = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      queryClient.removeQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    }
    return Promise.reject(error);
  },
);

export default api;
