"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user) return;

    if (allowedRoles && !allowedRoles.includes(user?.role.toLowerCase())) {
      router.push("/unauthorized");
    }
  }, [user]);

  return <>{children}</>;
}
