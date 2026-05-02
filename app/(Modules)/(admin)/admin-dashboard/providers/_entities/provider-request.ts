interface ProvideRequest {
  id: string;
  userId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  provideName: string;
  IDNumber: string;
  fullName: string;
  birthday: Date;
  nationality: string;
  location: string;
  IDImage: string;
  selfieIDImage: string;
  Portfolio: string[];
  createdAt: Date;
  updatedAt: Date;
}
enum RequestStatus {
  PENDING,
  APPROVED,
  REJECTED,
}

export default ProvideRequest;
