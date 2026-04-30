"use client";
/* eslint-disable @next/next/no-img-element */
import { toast } from "react-toastify";
import { LogOut, User } from "lucide-react";
import { useCurrentUser } from "../(Modules)/(auth)/_hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useLogout } from "../(Modules)/(auth)/_hooks/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import default_user_image from "@/public/assets/default-user1.png";

export function ProfileDropDown() {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  const { mutate: handleLogout } = useLogout(
    () => {
      router.push("/");
      window.location.reload();
      toast.success("Logged out successfully");
    },
    (error) => {
      toast.error(error.message || "Could not log out.");
    },
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-0 hover:opacity-80"
          >
            <img
              src={
                user?.userImage && !isLoading
                  ? user.userImage
                  : default_user_image.src
              }
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-lg"
        >
          <div className="px-2 py-1.5 text-sm text-gray-500 dark:text-gray-400">
            Signed in as{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {user?.username && !isLoading
                ? user.username
                : user?.email && !isLoading
                  ? user.email.substring(0, 5) + "..."
                  : "Guest"}
            </span>
          </div>

          <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-800" />

          <DropdownMenuItem
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User className="w-4 h-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-800" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
