import { TLogin } from "../_dto/login";
import { TProviderRequest } from "../_dto/provider-request";
import { TRegisterSchema } from "../_dto/register";

interface IAuthAPI {
  login: (data: TLogin) => Promise<{ success: boolean }>;
  register: (data: TRegisterSchema) => Promise<{ success: boolean }>;
  logout: () => Promise<{ success: boolean }>;
  requestProvider: (data: TProviderRequest) => Promise<{ success: boolean }>;
}

export default IAuthAPI;
