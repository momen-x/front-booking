import ServicesTable from "@/app/(Modules)/(provider)/provider-dashboard/services/_components/services-table";

const ServicesTablePage = async () => {
  let isLoading = true;
  const response = await fetch("http://localhost:5000/api/services");
  const data = await response.json();
  if (!response.ok) {
    isLoading = false;
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
  if (data) {
    isLoading = false;
  }
  return (
    <div>
      <ServicesTable services={data} isLoading={isLoading} />
    </div>
  );
};

export default ServicesTablePage;
