import { TLogin } from "../dto/login";
import { TRegisterSchema } from "../dto/register";
import api from "@/app/utils/axiosInstance";
import IAuthAPI from "./auth";

const BASE_URL = "/api/auth";

export const resAuth: IAuthAPI = {
    login: async (data: TLogin) => {
    const res = await api.post(`${BASE_URL}/login`, data);
    return res.data;
  },
  register: async (data: TRegisterSchema) => {
    const res = await api.post(`${BASE_URL}/register`, data);
    return res.data;
  },
  logout: async () => {
    const res = await api.post(`${BASE_URL}/logout`);
    return res.data;
  },

}