import Service from "../_entity/service";
import { TService } from "../../../(provider)/services/_dto/add-service";
import { TUpdateService } from "../../../(provider)/services/_dto/update-service";

interface IServiceApi {
  create: (data: TService) => Promise<Service>;
  delete: (id: string) => Promise<void>;
  update: (id: string, data: TUpdateService) => Promise<Service>;
}

export default IServiceApi;
