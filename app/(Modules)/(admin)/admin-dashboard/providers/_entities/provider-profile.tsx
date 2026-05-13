interface ProvideProfile {
  id: string; 
  userId: string;
  businessName: string;
  isActive: boolean;
  description: string | null;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default ProvideProfile;
