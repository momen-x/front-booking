"use client";
//ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "react-toastify";
import { Form } from "@/components/ui/form";
//hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//validations
import ValidationInput from "@/components/inputs/ValidationInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getErrorMessage from "../../../utils/getErrorMessage";
import { useRegister } from "../../_hooks/useRegister";
import { registerForm, TRegisterForm } from "../../_dto/register";

export function RegisterForm() {
  const [userType, setUserType] = useState<"user" | "provider">("user");
  const [isAgree, setIsAgree] = useState<boolean>(false);
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

  useEffect(() => {
    const saved = localStorage.getItem("registerFormData");
    if (saved) {
      const data = JSON.parse(saved);
      form.reset(data);
      localStorage.removeItem("registerFormData"); // clean up
    }
    const userType = localStorage.getItem("userType");
    if (userType === "provider") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserType("provider");
      localStorage.removeItem("userType");
    }
    const isAgree = localStorage.getItem("isAgree");
    if (isAgree === "true") setIsAgree(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          localStorage.removeItem("registerFormData");
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
  const handleContinueAsProvider = () => {
    const data = form.getValues();
    localStorage.setItem("registerFormData", JSON.stringify(data));
    localStorage.setItem("userType", "provider");
    localStorage.setItem("isAgree", "true");
    router.push("/register/provider");
  };
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-120 border border-border/40 overflow-hidden">
        <CardHeader className="pb-5 border-b border-border/40">
          <p className="font-serif text-2xl font-bold mb-3">
            book<span className="text-amber-600">it</span>
          </p>
          <CardTitle className="text-xl font-semibold">
            Create an account
          </CardTitle>
          <CardDescription>Join our community today</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
            <CardContent className="pt-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <ValidationInput<TRegisterForm>
                  fieldTitle="Username"
                  nameInSchema="username"
                  placeholder="johndoe"
                />
                <ValidationInput<TRegisterForm>
                  fieldTitle="Email"
                  nameInSchema="email"
                  placeholder="you@example.com"
                  type="email"
                />
                <ValidationInput<TRegisterForm>
                  fieldTitle="Password"
                  nameInSchema="password"
                  placeholder="••••••••"
                />
                <ValidationInput<TRegisterForm>
                  fieldTitle="Confirm password"
                  nameInSchema="confirmPassword"
                  placeholder="••••••••"
                />
              </div>

              {/* Account Type */}
              <div className="space-y-2">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
                  Account type
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUserType("user")}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      userType === "user"
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                        : "border-border/40 bg-muted/30 hover:bg-muted/60"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-sm border transition-all ${
                        userType === "user"
                          ? "bg-amber-200 border-amber-400"
                          : "bg-background border-border/40"
                      }`}
                    >
                      👤
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${userType === "user" ? "text-amber-900 dark:text-amber-200" : "text-foreground"}`}
                      >
                        Regular user
                      </p>
                      <p
                        className={`text-xs ${userType === "user" ? "text-amber-700 dark:text-amber-400" : "text-muted-foreground"}`}
                      >
                        Book services
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserType("provider")}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      userType === "provider"
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                        : "border-border/40 bg-muted/30 hover:bg-muted/60"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-sm border transition-all ${
                        userType === "provider"
                          ? "bg-amber-200 border-amber-400"
                          : "bg-background border-border/40"
                      }`}
                    >
                      💼
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${userType === "provider" ? "text-amber-900 dark:text-amber-200" : "text-foreground"}`}
                      >
                        Provider
                      </p>
                      <p
                        className={`text-xs ${userType === "provider" ? "text-amber-700 dark:text-amber-400" : "text-muted-foreground"}`}
                      >
                        Offer services
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/40">
                <Checkbox
                  id="terms"
                  className="mt-0.5 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 border"
                  onCheckedChange={(checked) => setIsAgree(checked === true)}
                />
                <Label
                  htmlFor="terms"
                  className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-foreground font-medium underline underline-offset-2"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/policy"
                    className="text-foreground font-medium underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-0 mt-3">
              <Button
                type={userType === "user" ? "submit" : "button"}
                onClick={() => {
                  if (userType === "provider") handleContinueAsProvider();
                }}
                className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white border-0"
                disabled={!isAgree || isPending || !form.formState.isValid}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {userType === "provider" ? "Redirecting..." : "Creating..."}
                  </span>
                ) : userType === "provider" ? (
                  "Continue →"
                ) : (
                  "Create account"
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-foreground font-medium underline underline-offset-2"
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

export default RegisterForm;
