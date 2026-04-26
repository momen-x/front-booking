"use client";
//ui
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Briefcase, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
//hooks
//validations
import ValidationInput from "@/components/inputs/ValidationInput";
import { registerForm, TRegisterForm } from "../../dto/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../hooks/useRegister";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import getErrorMessage from "../../../utils/getErrorMessage";

export function RegisterForm() {
  const router = useRouter();
  const { mutate: handleRegister, isPending } = useRegister();
  const form = useForm<TRegisterForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(registerForm as any),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (data: TRegisterForm) => {
    handleRegister(
      {
        password: data.password,
        username: data.username,
        email: data.email,
      },
      {
        onSuccess: () => {
          toast.success("register successfully!");
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 500);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const errorMessage = getErrorMessage(error);
          toast.error(errorMessage);
        },
      },
    );
  };
  return (
    <div>
      <Card className="border">
        {false && (
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-amber-500 to-orange-600 shadow-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white">
                Step 2 of 1
              </Badge>
            </div>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
            <CardHeader>
              <h1 className="text-2xl font-bold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Join our community today
              </p>
            </CardHeader>
            <CardContent className="space-y-5 mt-5">
              <div className="grid grid-cols-2 gap-5">
                <ValidationInput<TRegisterForm>
                  fieldTitle="Username"
                  nameInSchema="username"
                  placeholder="johndoe"
                  className="pl-9"
                />
                <ValidationInput<TRegisterForm>
                  fieldTitle="Email"
                  nameInSchema="email"
                  placeholder="you@example.com"
                  type="email"
                  className="pl-9"
                />

                <ValidationInput<TRegisterForm>
                  fieldTitle="password"
                  nameInSchema="password"
                  placeholder="••••••••"
                  className="pl-9"
                />

                <ValidationInput<TRegisterForm>
                  fieldTitle="confirmPassword"
                  nameInSchema="confirmPassword"
                  placeholder="••••••••"
                  className="pl-9"
                />
              </div>

              <div className="mt-5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Account Type
                </Label>
                <RadioGroup
                  defaultValue="user"
                  className="grid grid-cols-2  mt-0"
                >
                  {[
                    { value: "user", icon: Users, label: "Regular User" },
                    {
                      value: "provider",
                      icon: Briefcase,
                      label: "Service Provider",
                    },
                  ].map(({ value, icon: Icon, label }) => (
                    <div key={value}>
                      <RadioGroupItem
                        value={value}
                        id={value}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={value}
                        className="flex items-center gap-2.5 rounded-lg border border-border/30 bg-muted/30 px-4 py-3 cursor-pointer transition-all hover:bg-muted/60 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="text-sm font-medium">{label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-muted/30 px-3 py-3 mt-3">
                <Checkbox
                  id="terms"
                  className="mt-0.5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-foreground font-medium underline-offset-4 hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-foreground font-medium underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-0">
              <Button
                className="w-full h-10 hover:scale-[1.04]"
                type="submit"
                variant={"outline"}
                disabled={isPending || !form.formState.isValid}
              >
                Create Account
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-foreground font-medium underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
