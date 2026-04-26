import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ServiceCard from "../../services/_Components/service-card";

const instanceOfServices: {
  image: string[];
  name: string;
  deration: number;
  price: number;
  createdAt: string;
}[] = [
  {
    createdAt: "1-1-2027",
    deration: 30,
    image: [],
    name: "",
    price: 10,
  },
  {
    createdAt: "1-1-2027",
    deration: 30,
    image: [],
    name: "",
    price: 10,
  },
  {
    createdAt: "1-1-2027",
    deration: 30,
    image: [],
    name: "",
    price: 10,
  },
  {
    createdAt: "1-1-2027",
    deration: 30,
    image: [],
    name: "",
    price: 10,
  },
];
const defaultImage =
  "https://res.cloudinary.com/dsudicotm/image/upload/v1776600183/ecommerce-billboards/tsxveaa9qpyamqyf6eue.jpg";
const ProviderServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Input
        type="search"
        placeholder="Search services...🔍"
        className="mb-4"
      />{" "}
      <Button>Search</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {instanceOfServices.map((service, index) => (
          <ServiceCard
            key={index}
            image={defaultImage}
            createdAt={service.createdAt}
            deration={service.deration}
            name={service.name}
            price={service.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProviderServicesPage;
