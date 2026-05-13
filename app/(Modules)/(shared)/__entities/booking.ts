interface Bookings {
  id: string;
  userId: string;
  providerId: string;
  serviceId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  deletedAt: null | Date;
  createdAt: Date;
  updatedAt: Date;
  provider: {
    businessName: string;
    location: string;
  };
  service: {
    name: string;
    duration: number;
    price: number;
  };
}
export default Bookings;
