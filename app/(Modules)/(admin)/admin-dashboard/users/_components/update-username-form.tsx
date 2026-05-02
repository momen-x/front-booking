/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationInput from "@/components/inputs/ValidationInput";
import fields from "../_data/update-user-username-field";
import { TUpdateUsername, updateUsername } from "../_dto/update-user-username";
import { useUpdateUserUsername } from "../_hooks/useUpdateUserUsername";
import { toast } from "react-toastify";
import getErrorMessage from "@/app/(Modules)/utils/getErrorMessage";
import { useSearchParams } from "next/navigation";

const UpdateUsernameForm = ({
  id,
  username,
}: {
  id: string;
  username?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<TUpdateUsername>({
    resolver: zodResolver(updateUsername as any),
    mode: "onChange",
    defaultValues: {
      username: username ?? "",
    },
  });
  const { mutate: handleUpdateUsername, isPending } = useUpdateUserUsername(id);
  const handleSubmit = (data: TUpdateUsername) => {
    handleUpdateUsername(data, {
      onSuccess: () => {
        toast.success("Username updated successfully");
        const params = new URLSearchParams(searchParams.toString());
        params.set("username", data.username);
        router.replace(
          `/admin-dashboard/users/users-update-form?${params.toString()}`,
        );

        form.reset({ username: data.username });
      },
      onError: (error) => {
        toast.error(getErrorMessage(error) || "Error updating username");
      },
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {fields.map(({ name, title, placeholder, icon }) => (
            <div key={name} className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="text-muted-foreground">{icon}</span>
                {title}
              </div>
              <ValidationInput<TUpdateUsername>
                fieldTitle=""
                nameInSchema={name}
                placeholder={placeholder}
                className="h-10 rounded-xl"
              />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-10 rounded-xl"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-10 rounded-xl"
              disabled={isPending}
            >
              {isPending ? "Loading…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUsernameForm;
