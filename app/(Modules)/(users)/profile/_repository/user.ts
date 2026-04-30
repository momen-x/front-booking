import User from "../../_entity/user";
import {
  TUpdateUsername,
  TUpdatePassword,
  TUploadUserImage,
} from "../_dto/update-user-profile";

interface IUserAPI {
  uploadImage: (dto: TUploadUserImage) => Promise<User>;
  deleteUserImage: () => Promise<User>;
  updateUsername: (dto: TUpdateUsername) => Promise<User>;
  updatePassword: (dtp: TUpdatePassword) => Promise<User>;
}

export default IUserAPI;
