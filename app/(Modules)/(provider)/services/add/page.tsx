import { Metadata } from "next";
import AddServiceForm from "../_components/add-or-update-service-form";
export const metadata: Metadata = {
  title: "Add Service",
};
const AddServicePage = () => {
  return (
    <div className="w-[50%] m-auto">
      <AddServiceForm
        goal="add"
        description="Create a new service offering for your customers"
        providerId="6ce2460d-3c5c-47fd-b067-1e6cf5d68c4d"
      />
    </div>
  );
};

export default AddServicePage;
