"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Briefcase,
  Star,
  LogOutIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logoutUser } from "@/slices/authSlice";
import { toast } from "react-toastify";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin" },
  { label: "Bookings", icon: ClipboardList, href: "/dashboard/bookings" },
  { label: "Services", icon: Briefcase, href: "/dashboard/services" },
  { label: "Employees", icon: Users, href: "/dashboard/employees" },
  { label: "Users", icon: Users, href: "/dashboard/users" },
  { label: "Reviews", icon: Star, href: "/dashboard/reviews" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout success");
    router.push("/login-staff");
  };
  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm px-4 py-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-green-600 mb-8">Admin Panel</h1>
        <nav className="flex flex-col gap-3">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm font-medium
              ${
                pathname === href
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon size={18} /> {label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
      >
        <LogOutIcon size={18} />
        Logout
      </button>
    </aside>
  );
}
