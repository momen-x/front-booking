import { cookies } from "next/headers";
import Provider from "../../(shared)/__entities/provider";
import Link from "next/link";

const ProviderDashboardPage = async () => {
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

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend failed with status ${response.status}:`, errorText);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8  rounded-lg shadow-md">
          <p className="text-red-600 font-medium">
            ⚠️ Error: {response.statusText}
          </p>
          <p className="text-gray-500 text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const data = (await response.json()) as Provider;

  return (
    <div className="min-h-screen  py-8 px-4">
      <Link
        href={"/provider-dashboard/providers/update"}
        className="bg-linear-to-r from-blue-600 to-blue-700 p-3 rounded-2xl hover:bg-amber-500  mb-10 text-center"
      >
        ⬅️ Update the provider data
      </Link>
      <div className="max-w-4xl mx-auto mt-6">
        <div className=" rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold ">Provider Dashboard</h1>
            <p className=" text-sm mt-1">Welcome back!</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid gap-4 ">
              <InfoRow label="Business Name" value={data.businessName} />
              <InfoRow
                label="Location"
                value={data.location ?? "Not provided"}
              />
              <InfoRow
                label="Description"
                value={data.description ?? "Not provided"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-gray-100 pb-3 last:border-0">
    <span className="text-sm font-medium  block mb-1">{label}</span>
    <span>{value || "Not provided"}</span>
  </div>
);

export default ProviderDashboardPage;
