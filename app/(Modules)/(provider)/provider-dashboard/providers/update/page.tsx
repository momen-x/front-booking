import React from "react";
import UpdateProviderForm from "../_components/update-provider-form";
import { cookies } from "next/headers";

const UpdateProviderPage = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    "http://localhost:5000/api/provider-profile/current-provider",
    {
      headers: {
        Cookie: allCookies,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    },
  );
  const provider = await response.json();
  console.log(provider);
  return (
    <div>
      <UpdateProviderForm
        businessName={provider.businessName}
        location={provider.location}
        description={provider.description}
        isActive={provider.isActive}
        redirectPath="/provider-dashboard"
      />
    </div>
  );
};

export default UpdateProviderPage;
