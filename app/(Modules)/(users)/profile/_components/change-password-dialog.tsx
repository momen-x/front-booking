/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";
import { Form } from "@/components/ui/form";
import ValidationInput from "@/components/inputs/ValidationInput";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TUpdatePassword, updatePassword } from "../_dto/update-user-profile";
import { useUpdatePassword } from "../hooks/useUpdatePassword";

interface ChangePasswordDialogProps {
  children?: React.ReactNode;
}

const ChangePasswordDialog = ({ children }: ChangePasswordDialogProps) => {
  const { mutate: handleUpdatePassword, isPending } = useUpdatePassword();
  const router = useRouter();
  const form = useForm<TUpdatePassword>({
    resolver: zodResolver(updatePassword as any),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (data: TUpdatePassword) => {
    handleUpdatePassword(data, {
      onSuccess: () => {
        toast.success("Password updated successfully");
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            <Lock className="h-4 w-4" />
            Change Password
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Change Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            <div className="space-y-2">
              <ValidationInput<TUpdatePassword>
                fieldTitle="Enter the old password"
                nameInSchema="oldPassword"
                className=""
                type="password"
              />
            </div>
            <div className="space-y-2">
              <ValidationInput<TUpdatePassword>
                fieldTitle="Enter the new password"
                nameInSchema="password"
                className=""
                type="password"
              />
            </div>
            <div className="space-y-2">
              <ValidationInput<TUpdatePassword>
                fieldTitle="Enter the old password"
                nameInSchema="confirmPassword"
                className=""
                type="password"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !form.formState.isValid}
                className="flex-1"
              >
                {isPending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
