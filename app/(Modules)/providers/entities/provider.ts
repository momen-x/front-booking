interface Provider {
  id: string;
  userId: string; //(FK → User)
  businessName: string;
  isActive: boolean;
  description: string | null;
  location: string | null;
  createdAt: Date;
}

export default Provider;
