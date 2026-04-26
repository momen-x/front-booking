import { Input } from "@/components/ui/input";
import ServiceCard from "./_Components/service-card";
import ServiceTable from "./_Components/service-table";
import { Button } from "@/components/ui/button";
import Service from "./entity/service";
import transformingTheDateToATextString from "../utils/date-to-string";

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
const ServicesPage = async () => {
  const response = await fetch("http://localhost:5000/api/services");
  const services: Service[] = await response.json();
  console.log(services);
  return (
    <div className="container mx-auto px-4 py-8">
      <Input
        type="search"
        placeholder="Search services...🔍"
        className="mb-4"
      />{" "}
      <Button>Search</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            image={defaultImage}
            createdAt={transformingTheDateToATextString(service.createdAt)}
            deration={service.duration}
            name={service.name}
            price={service.price}
          />
        ))}
      </div>
      <ServiceTable />
    </div>
  );
};

export default ServicesPage;
