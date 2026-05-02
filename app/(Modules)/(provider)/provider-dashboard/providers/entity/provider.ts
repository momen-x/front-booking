interface Provider {
  businessName: string;
  createdAt: Date;
  description: string | null;
  id: string;
  isActive: boolean;
  location: string | null;
  updatedAt: Date;
  userId: string;
}
export default Provider;
