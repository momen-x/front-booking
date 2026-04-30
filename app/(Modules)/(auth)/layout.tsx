import GuestGuard from "@/components/guards/GuestGuard";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <GuestGuard redirectTo="/">{children}</GuestGuard>
    </>
  );
};

export default AuthLayout;
