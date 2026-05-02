import RoleGuard from "@/components/guards/RoleGuard";
import React from "react";
import ProviderDashboard from "./_components/dashboard";

const ProviderLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <RoleGuard allowedRoles={["PROVIDER"]}>
      <ProviderDashboard>{children}</ProviderDashboard>
    </RoleGuard>
  );
};

export default ProviderLayout;
