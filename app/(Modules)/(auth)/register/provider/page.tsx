import { Metadata } from "next";
import ProviderForm from "../_Components/provider-form";
export const metadata: Metadata = {
  title: "Provider request",
  description: "request application for a provider",
};
const ProviderPage = () => {
  return (
    <div>
      <ProviderForm />
    </div>
  );
};

export default ProviderPage;
