import Provider from "../../../../(shared)/__entities/provider";
import { TUpdateProvider } from "@/app/(Modules)/(public)/providers/dto/update-provider";

interface IProviderAPI {
  update: (dto: TUpdateProvider, userId?: string) => Promise<Provider>;
}
export default IProviderAPI;
