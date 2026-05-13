/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ValidationInput from "@/components/inputs/ValidationInput";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUpdateProvider, UpdateProviderSchema } from "../_dto/update-provider";
import { useUpdateProvider } from "../_hooks/useUpdateProvider";
import { toast } from "react-toastify";
import getErrorMessage from "@/app/(Modules)/utils/getErrorMessage";
import { ArrowLeft } from "lucide-react";
import fields from "../_data/fields";

const UpdateProviderForm = ({
  businessName,
  location,
  description,
  userId,
  redirectPath = "/provider-dashboard",
}: {
  businessName: string;
  location: string | null;
  description: string | null;
  isActive: boolean;
  userId?: string;
  redirectPath?: string;
}) => {
  const router = useRouter();
  const { mutate: handleUpdateProvider, isPending } = useUpdateProvider(
    userId ?? "",
  );

  const form = useForm<TUpdateProvider>({
    resolver: zodResolver(UpdateProviderSchema as any),
    mode: "onChange",
    defaultValues: {
      businessName,
      description: description || "",
      location: location || "",
    },
  });

  const handleSubmit = async (data: TUpdateProvider) => {
    await handleUpdateProvider(data, {
      onSuccess: () => {
        toast.success("Provider updated successfully");
        router.push(redirectPath);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error) || "Error updating provider");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-12 px-4">
      <div className="w-full max-w-sm space-y-5">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Update Business
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Edit your provider profile details
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {fields.map(({ name, title, placeholder, icon }) => (
                <div key={name} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="text-muted-foreground">{icon}</span>
                    {title}
                  </div>
                  <ValidationInput<TUpdateProvider>
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
                  disabled={isPending || !form.formState.isValid}
                  className="flex-1 h-10 rounded-xl"
                >
                  {isPending ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProviderForm;
