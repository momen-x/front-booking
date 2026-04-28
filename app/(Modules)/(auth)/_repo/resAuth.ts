import { TLogin } from "../_dto/login";
import { TRegisterSchema } from "../_dto/register";
import api from "@/app/utils/axiosInstance";
import IAuthAPI from "./auth";
import { TProviderRequest } from "../_dto/provider-request";

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
  requestProvider: async (data: TProviderRequest) => {
    const formData = new FormData();

    formData.append("provideName", data.provideName);
    formData.append("IDNumber", data.IDNumber);
    formData.append("fullName", data.fullName);
    formData.append(
      "birthday",
      data.birthday instanceof Date
        ? data.birthday.toISOString()
        : String(data.birthday),
    );
    formData.append("nationality", data.nationality);
    formData.append("location", data.location);

    if (data.IDImage) {
      formData.append("IDImage", data.IDImage);
    }

    if (data.selfieIDImage) {
      formData.append("selfieIDImage", data.selfieIDImage);
    }
    if (data.Portfolio) {
      data.Portfolio.forEach((file) => {
        formData.append("Portfolio", file);
      });
    }
    const res = await api.post(`/api/provider-request`, formData);
    return res.data;
  },
};
