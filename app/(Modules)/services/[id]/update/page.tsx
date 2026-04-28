import { Metadata } from "next";
import ServiceForm from "../../_Components/add-or-update-service-form";
import IParams from "@/app/(Modules)/type/params";
export const metadata: Metadata = {
  title: "Update Service",
};

const UpdateServicePage = async ({ params }: IParams) => {
  const { id } = await params;
  if(!id) {
    return <div>Service not found</div>;
  }
  const response = await fetch(`http://localhost:5000/api/services/${id}`);
  const service = await response.json();

  return (
    <div className="w-[50%] m-auto">
      <ServiceForm
        goal="update"
        description="update a new service offering for your customers"
        providerId="6ce2460d-3c5c-47fd-b067-1e6cf5d68c4d"
        id={id}
        service={service}
      />
    </div>
  );
};

export default UpdateServicePage;
