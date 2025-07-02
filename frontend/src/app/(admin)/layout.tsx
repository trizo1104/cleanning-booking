import AdminSidebar from "@/components/AdminSidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full min-h-screen bg-gray-50">{children}</main>
    </div>
  );
}
