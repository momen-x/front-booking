import User from "@/app/(Modules)/(shared)/__entities/user";
import { TUpdateUserPassword } from "../_dto/update-user-password";

interface IUserAPI {
  updatePassword: (dto: TUpdateUserPassword) => Promise<User>;
  updateUsername: (id: string, username: string) => Promise<User>;
}

export default IUserAPI;
