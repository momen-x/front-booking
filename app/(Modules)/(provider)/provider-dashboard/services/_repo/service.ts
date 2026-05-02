import Service from "@/app/(Modules)/(public)/services/_entity/service";
import { TService } from "../_dto/add-service";
import { TUpdateService } from "../_dto/update-service";

interface IServiceApi {
  create: (data: TService) => Promise<Service>;
  delete: (id: string) => Promise<void>;
  update: (id: string, data: TUpdateService) => Promise<Service>;
  getServicesByProvider: () => Promise<Service[]>;
}

export default IServiceApi;
