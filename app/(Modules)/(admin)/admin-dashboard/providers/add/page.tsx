import { Metadata } from "next";
import AddProviderForm from "../_components/add-provider-form";

export const metadata: Metadata = {
  title: "Add Provider",
  description: "Add Provider",
};
const AddProviderPage = () => {
  return (
    <div className="border  w-[70%] m-auto p-8 rounded-2xl shadow-amber-100">
      <AddProviderForm />
    </div>
  );
};

export default AddProviderPage;
