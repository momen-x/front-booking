"use client";

import { ReactNode, useEffect } from "react";
import { useCurrentUser } from "@/app/(Modules)/(auth)/_hooks/useCurrentUser";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  redirectTo?: string; // optional (default: "/")
};

const GuestGuard = ({ children, redirectTo = "/" }: Props) => {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectTo);
    }
  }, [isLoading, user, router, redirectTo]);

  // if logged in → block page
  if (user) return null;

  // while loading → show children (e.g., login form) but don't redirect
  // redirect is prevented by the !isLoading check in useEffect
  return <>{children}</>;
};

export default GuestGuard;