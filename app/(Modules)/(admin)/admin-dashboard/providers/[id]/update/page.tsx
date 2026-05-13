import UpdateProviderForm from "@/app/(Modules)/(provider)/provider-dashboard/providers/_components/update-provider-form";
import IParams from "@/app/(Modules)/type/params";
import getSingleProviderProfile from "../../_utils/getSingleProviders";
import ProviderProfile from "../../_entities/provider-profile";

const UpdateProviderPage = async ({ params }: IParams) => {
  const { id } = await params;
  const p = (await getSingleProviderProfile(id)) as ProviderProfile;
  if (!p) {
    return <div>Provider not found</div>;
  }
  return (
    <div>
      <UpdateProviderForm {...p} userId={id} redirectPath="/admin-dashboard/providers" />
    </div>
  );
};

export default UpdateProviderPage;
