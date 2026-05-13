import api from "@/app/utils/axiosInstance";
import { minutesToISOString, TCreateBooking } from "../_dto/create-booking";
import IBookingAPI from "./booking";

const BASE_URL = "/api/bookings";

export const resBooking: IBookingAPI = {
  create: async (dto: TCreateBooking) => {
    const { providerId, serviceId, date, startTime } = dto;
    const res = await api.post(BASE_URL, {
      providerId,
      serviceId,
      date, // string is fine
      startTime: minutesToISOString(startTime, date), // number (e.g. 540)
    });
    return res.data;
  },
};
