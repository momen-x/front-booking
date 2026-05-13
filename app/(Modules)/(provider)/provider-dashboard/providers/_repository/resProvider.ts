import api from "@/app/utils/axiosInstance";
import IProviderAPI from "./provider";
import { TUpdateProvider } from "@/app/(Modules)/(public)/providers/dto/update-provider";

const BASE_URL = "/api/provider-profile";

const resProvider: IProviderAPI = {
  update: async (dto: TUpdateProvider, userId?: string) => {
    const res = await api.put(`${BASE_URL}/${userId?.trim()}`, dto);
    return res.data;
  },
};

export default resProvider;
