import { Input } from "@/components/ui/input";
import ServiceCard from "./_Components/service-card";
import ServiceTable from "./_Components/service-table";
import { Button } from "@/components/ui/button";
import Service from "./_entity/service";
import transformingTheDateToATextString from "../utils/date-to-string";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
};

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
            image={service.images[0] || defaultImage}
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
