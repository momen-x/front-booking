"use client";
import { Button } from "@/components/ui/button";
import { useLogout } from "../_hooks/useLogout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import getErrorMessage from "../../utils/getErrorMessage";
import { LogOut, Loader2 } from "lucide-react";

const LogoutBtn = () => {
  const router = useRouter();
  const { mutate: handleLogout, isPending } = useLogout(
    () => {
      toast.success("Logged out successfully!");
      router.push("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => {
      toast.error(getErrorMessage(error));
    },
  );

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        handleLogout({
          onSuccess: () => {},
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            toast.error(getErrorMessage(error));
          },
        });
      }}
      disabled={isPending}
      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 transition-all duration-200"
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Logging out...</span>
        </>
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </>
      )}
    </Button>
  );
};

export default LogoutBtn;
