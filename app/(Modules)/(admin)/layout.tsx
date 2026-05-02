import { Metadata } from "next";
import AdminDashBoard from "./_components/dashboard";
import RoleGuard from "@/components/guards/RoleGuard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <AdminDashBoard>{children}</AdminDashBoard>
    </RoleGuard>
  );
};

export default AdminDashboardLayout;
