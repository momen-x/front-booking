import AuthGuard from "@/components/guards/AuthGuard";
import React from "react";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default UserLayout;
