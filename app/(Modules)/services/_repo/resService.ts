import { TService } from "../_dto/add-service";
import { TUpdateService } from "../_dto/update-service";
import IServiceApi from "./service";
import api from "@/app/utils/axiosInstance";

const BASE_URL = "/api/services";

const resService: IServiceApi = {
  create: async (data: TService) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("providerId", data.providerId);
    formData.append("duration", String(data.duration));
    formData.append("price", String(data.price));
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    const res = await api.post(BASE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  update: async (id: string, data: TUpdateService) => {
    const formData = new FormData();

    if (data.providerId) formData.append("providerId", data.providerId);
    if (data.name) formData.append("name", data.name);
    if (data.duration) formData.append("duration", String(data.duration));
    if (data.price) formData.append("price", String(data.price));

    if (data.imagesToRemove && data.imagesToRemove.length > 0) {
      formData.append("imagesToRemove", JSON.stringify(data.imagesToRemove));
    }

    // Append new image files
    if (data.newImages && data.newImages.length > 0) {
      for (let i = 0; i < data.newImages.length; i++) {
        formData.append("newImages", data.newImages[i]);
      }
    }

    const res = await api.put(`${BASE_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  delete: async (id: string) => {
    const res = await api.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};

export default resService;
