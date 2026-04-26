interface Service {
  id: string;
  providerId: string;
  name: string;
  duration: number;
  price: number;
  createdAt: Date;
  images: string[];
}

export default Service;
