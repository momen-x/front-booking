/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ChangePasswordDialog from "../_components/change-password-dialog";
import LoadingSkeleton from "../_components/loading-skeleton";
import ValidationInput from "@/components/inputs/ValidationInput";
import { TUpdateUsername, updateUsername } from "../_dto/update-user-profile";
import { useUpdateUsername } from "../hooks/useUpdateUsername";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Lock, ArrowLeft, UserRound } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/app/(Modules)/(auth)/_hooks/useCurrentUser";
import getErrorMessage from "@/app/(Modules)/utils/getErrorMessage";

const EditUserProfilePage = () => {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: handleUpdateUsername, isPending } = useUpdateUsername();

  const form = useForm<TUpdateUsername>({
    resolver: zodResolver(updateUsername as any),
    defaultValues: { username: user?.username || "" },
    mode: "onChange",
  });

  useEffect(() => {
    form.resetField("username", { defaultValue: user?.username || "" });
  }, [user]);

  const handleSubmit = (data: TUpdateUsername) => {
    handleUpdateUsername(data, {
      onSuccess: () => toast.success("Username updated successfully"),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  if (isLoading) return <LoadingSkeleton />;
  if (!user) return null;

  const isUnchanged = user.username === form.watch("username");
  const isDisabled =
    form.formState.isSubmitting ||
    isPending ||
    !form.formState.isValid ||
    isUnchanged;

  return (
    <div className="min-h-screen flex items-start justify-center pt-12 px-4">
      <div className="w-full max-w-sm space-y-5">
        {/* Back link */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Edit Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Update your account details below
          </p>
        </div>

        {/* Username Card */}
        <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <UserRound className="h-4 w-4 text-muted-foreground" />
            Username
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-3"
            >
              <ValidationInput<TUpdateUsername>
                fieldTitle=""
                nameInSchema="username"
                className="h-10 rounded-xl"
              />
              <Button
                type="submit"
                disabled={isDisabled}
                className="w-full h-10 rounded-xl"
              >
                {isPending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Security Card */}
        <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Lock className="h-4 w-4 text-muted-foreground" />
            Security
          </div>
          <ChangePasswordDialog>
            <Button variant="outline" className="w-full h-10 rounded-xl gap-2">
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
          </ChangePasswordDialog>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfilePage;
