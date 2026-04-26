"use client";
//ui
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
//hooks
import { useRouter } from "next/navigation";
// validations
import ValidationInput from "@/components/inputs/ValidationInput";
import { loginSchema, TLogin } from "../../dto/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/useLogin";
import getErrorMessage from "../../../utils/getErrorMessage";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<TLogin>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(loginSchema as any),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const { mutate: handleLogin, isPending } = useLogin();

  const handleSubmit = async (data: TLogin) => {
    handleLogin(data, {
      onSuccess: () => {
        toast.success("Welcome back!");
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
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto px-2 mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <ValidationInput<TLogin>
              fieldTitle="Email"
              nameInSchema="email"
              placeholder="you@example.com"
              type="email"
              className="pl-9"
            />
          </div>

          <div className="relative">
            <ValidationInput<TLogin>
              fieldTitle="Password"
              nameInSchema="password"
              placeholder="••••••••"
              type={"password"}
              className="pl-9 pr-10"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 cursor-pointer"
            disabled={isPending || !form.formState.isValid}
            variant={"outline"}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-foreground font-medium underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
