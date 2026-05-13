interface BookingPayload {
  providerId: string;
  serviceId: string;
  date: string; // "YYYY-MM-DD"
  startTime: number; // minutes from availability
  endTime: number; // minutes from availability
}

export default BookingPayload;
