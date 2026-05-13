import { cookies } from "next/headers";
import ProviderRequest from "../_entities/provider-request";
import ProviderRequestComponent from "../_components/provider-request";
import { Card } from "@/components/ui/card";

const ProviderRequestPage = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const token = cookieStore.get("token")?.value;
  const response = await fetch("http://localhost:5000/api/provider-request", {
    headers: {
      Cookie: allCookies,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  const providerRequests = (await response.json()) as ProviderRequest[];
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend failed with status ${response.status}:`, errorText);
  }
  if (providerRequests.length === 0) {
    return <div> no provider requests</div>;
  }
  return (
    <div>
      {providerRequests.map((provider) => (
        <div key={provider.id}>
          <Card className="p-5 m-5">
            <ProviderRequestComponent {...provider} />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProviderRequestPage;
