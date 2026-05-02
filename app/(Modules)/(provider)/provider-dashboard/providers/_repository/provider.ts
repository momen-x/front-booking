import Provider from "../entity/provider";
import { TUpdateProvider } from "@/app/(Modules)/(public)/providers/dto/update-provider";

interface IProviderAPI {
  update: (dto: TUpdateProvider) => Promise<Provider>;
}
export default IProviderAPI;
