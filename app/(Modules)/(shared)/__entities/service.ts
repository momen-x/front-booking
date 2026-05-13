interface Service {
  id: string;
  providerId: string;
  name: string;
  duration: number;
  price: number;
  createdAt: Date;
  images: string[];
  provider: {
    businessName: string; 
    location: string | null;
  };
}

export default Service;
