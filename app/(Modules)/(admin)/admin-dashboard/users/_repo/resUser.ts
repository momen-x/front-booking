import api from "@/app/utils/axiosInstance";
import IUserAPI from "./user";
import { TUpdateUserPassword } from "../_dto/update-user-password";
import User from "@/app/(Modules)/(users)/_entity/user";
const BASE_URL = "/api/users";

const resUser: IUserAPI = {
  updatePassword: async (dto: TUpdateUserPassword) => {
    const updateUser = await api.put(`${BASE_URL}/admin/password`, dto);
    return updateUser.data as User;
  },
  updateUsername: async (id: string, username: string) => {
    const updateUser = await api.put(`${BASE_URL}/${id}/username`, {
      username,
    });
    return updateUser.data as User;
  },
};

export default resUser;
