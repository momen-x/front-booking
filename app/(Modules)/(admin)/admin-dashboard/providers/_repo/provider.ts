import Provider from "@/app/(Modules)/(public)/providers/entities/provider";
import { TCreateProvider } from "../_dto/create-provider";

interface IProviderAPI {
  create: (dto: TCreateProvider) => Promise<Provider>;
}
export default IProviderAPI;
