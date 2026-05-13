import api from "@/app/utils/axiosInstance";
import { TCreateProvider } from "../_dto/create-provider";
import IProviderAPI from "./provider";

const BASE_URL = "/api/provider-profile";
const resProvider: IProviderAPI = {
  create: async (dto: TCreateProvider) => {
    const response = await api.post(BASE_URL, dto);
    return response.data;
  },
};

export default resProvider;
