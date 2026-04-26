import { TLogin } from "../dto/login";
import { TRegisterSchema } from "../dto/register";

interface IAuthAPI {
  login: (data: TLogin) => Promise<{ success: boolean }>;
  register: (data: TRegisterSchema) => Promise<{ success: boolean }>;
  logout: () => Promise<{ success: boolean }>;
}

export default IAuthAPI;