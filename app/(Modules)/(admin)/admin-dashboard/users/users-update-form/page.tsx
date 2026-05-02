import { Separator } from "@/components/ui/separator";
import UpdateUserPasswordForm from "../_components/update-user-password-form";
import UpdateUsernameForm from "../_components/update-username-form";
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const UpdateUserForm = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  if (!id) return;

  return (
    <div className="w-[50%] border  p-8 rounded-lg shadow-md  m-auto">
      <UpdateUserPasswordForm email={email ?? ""} />
      <br />
      <Separator />
      <div>
        <UpdateUsernameForm id={id} username={username} />
      </div>
    </div>
  );
};

export default UpdateUserForm;
