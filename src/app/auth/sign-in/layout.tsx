"use client";

import GuestGuard from "@/auth/guard/guest-guard";
import GuestAuthLayout from "@/components/templates/auth/guest-auth-layout";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <GuestGuard>
      <GuestAuthLayout>{children}</GuestAuthLayout>
    </GuestGuard>
  );
};

export default Layout;
