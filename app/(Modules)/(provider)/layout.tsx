import RoleGuard from "@/components/guards/RoleGuard";
import React from "react";

const ProviderLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <RoleGuard allowedRoles={["PROVIDER"]}>{children}</RoleGuard>;
};

export default ProviderLayout;
