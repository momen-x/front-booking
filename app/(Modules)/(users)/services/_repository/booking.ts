import BookingPayload from "../../../(shared)/__entities/booking-payload";
import { TCreateBooking } from "../_dto/create-booking";

interface IBookingAPI {
  create: (dto: TCreateBooking) => Promise<BookingPayload>;
}
export default IBookingAPI;
