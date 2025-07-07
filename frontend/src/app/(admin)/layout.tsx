import AdminSidebar from "@/components/AdminSidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="w-full overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
}
