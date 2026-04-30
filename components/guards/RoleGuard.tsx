// components/guards/RoleGuard.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useCurrentUser } from "@/app/(Modules)/(auth)/_hooks/useCurrentUser";
import { useRouter } from "next/navigation";

type Role = "" | "USER" | "ADMIN" | "PROVIDER";

type Props = {
  children: ReactNode;
  allowedRoles: Role[];
};

const RoleGuard = ({ children, allowedRoles }: Props) => {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
      } else if (!allowedRoles.includes(user.role as unknown as Role)) {
        router.replace("/forbidden");
      }
    }
  }, [isLoading, user, router, allowedRoles]);

  if (isLoading) return null;

  if (!user || !allowedRoles.includes(user.role as unknown as Role))
    return null;

  return <>{children}</>;
};

export default RoleGuard;
