import { TCreateAvailability } from "../_dto/create-available";
import Availability from "../../../../(shared)/__entities/availability";
export interface IAavailabilityAPI {
  AddAvailable: (dto: TCreateAvailability) => Promise<Availability>;
  delete: (id: string) => Promise<Availability>;
}
