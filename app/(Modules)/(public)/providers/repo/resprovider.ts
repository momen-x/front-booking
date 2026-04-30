import api from "@/app/utils/axiosInstance";
import IProviderApi from "./provider";
import { TUpdateProvider } from "../dto/update-provider";

const BASE_URL = "/api/providers";

const resProvider: IProviderApi = {
  getAll: async () => {
    const res = await api.get(BASE_URL);
    return res.data;
  },
  getById: async (id: string) => {
    const res = await api.get(`${BASE_URL}/${id}`);
    return res.data;
  },
  update: async (id: string, data: TUpdateProvider) => {
    const res = await api.put(`${BASE_URL}/${id}`, data);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await api.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};
export default resProvider;
