"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  User,
  ClipboardList,
  Users,
  Briefcase,
  Activity,
  Star,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAllBookings, getAllReviewForAdmin } from "@/slices/bookingSlice";
import { getAllEmployee, getAllUser } from "@/slices/authSlice";
import { getAllService } from "@/slices/serviceSlice";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    services: 0,
    employees: 0,
    users: 0,
    reviews: 0,
    totalRevenueThisMonth: 0,
    totalRevenueAllPaid: 0,
    paidBookings: 0,
    cancelledBookings: 0,
  });

  const [chartData, setChartData] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, review } = useSelector((state: RootState) => state.booking);
  const { users, staff } = useSelector((state: RootState) => state.auth);
  const { services } = useSelector((state: RootState) => state.service);
  const [filterType, setFilterType] = useState<"week" | "month">("week");

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getAllEmployee());
    dispatch(getAllReviewForAdmin());
    dispatch(getAllService());
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const paidBookings = bookings.filter((b) => b.status === "paid");
    const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

    const totalRevenueThisMonth = paidBookings.reduce((total, b) => {
      const date = new Date(b.date);
      const isCurrentMonth =
        date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      const price = Number(b.selectedPrice);
      return isCurrentMonth && !isNaN(price) ? total + price : total;
    }, 0);

    const totalRevenueAllPaid = paidBookings.reduce((sum, b) => {
      const price = Number(b.selectedPrice);
      return !isNaN(price) ? sum + price : sum;
    }, 0);

    setStats({
      bookings: bookings.length,
      services: services.length,
      employees: staff.filter((u) => u.role === "staff").length,
      users: users.filter((u) => u.role === "user").length,
      reviews: review.length,
      totalRevenueThisMonth,
      totalRevenueAllPaid,
      paidBookings: paidBookings.length,
      cancelledBookings: cancelledBookings.length,
    });
  }, [bookings, services, users, review]);

  useEffect(() => {
    const map: Record<string, { count: number; total: number }> = {};

    bookings
      .filter((b) => b.status === "paid")
      .forEach((b) => {
        const date = new Date(b.date);
        let key = "";

        if (filterType === "week") {
          key = date.toLocaleDateString("vi-VN");
        } else {
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          key = `${month < 10 ? "0" + month : month}/${year}`;
        }

        if (!map[key]) {
          map[key] = { count: 0, total: 0 };
        }

        map[key].count += 1;
        map[key].total += Number(b.selectedPrice || 0);
      });

    const sortedData: any = Object.entries(map)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, value]) => ({ date, ...value }));

    setChartData(sortedData);
  }, [bookings, filterType]);

  const cards = [
    {
      label: "Doanh thu tháng này",
      icon: DollarSign,
      value: stats.totalRevenueThisMonth.toLocaleString("vi-VN") + "đ",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Tổng doanh thu",
      icon: DollarSign,
      value: stats.totalRevenueAllPaid.toLocaleString("vi-VN") + "đ",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Đơn đã Paid",
      icon: CheckCircle,
      value: stats.paidBookings,
      color: "bg-lime-100 text-lime-700",
    },
    {
      label: "Đơn đã Cancelled",
      icon: XCircle,
      value: stats.cancelledBookings,
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Total Bookings",
      icon: ClipboardList,
      value: stats.bookings,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Services",
      icon: Briefcase,
      value: stats.services,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Employees",
      icon: Users,
      value: stats.employees,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Users",
      icon: User,
      value: stats.users,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Reviews",
      icon: Star,
      value: stats.reviews,
      color: "bg-pink-100 text-pink-700",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700 mb-8"
      >
        Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            className={`p-6 rounded-xl shadow ${card.color} flex items-center gap-4`}
          >
            <card.icon size={36} />
            <div>
              <p className="text-lg font-semibold">{card.value}</p>
              <p className="text-sm">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "week" | "month")}
          className="border px-3 py-2 rounded-md"
        >
          <option value="week">Theo tuần</option>
          <option value="month">Theo tháng</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Activity size={18} />
          Doanh thu {filterType === "week" ? "theo tuần" : "theo tháng"}
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: any, name: string) =>
                name === "total"
                  ? `${Number(value).toLocaleString("vi-VN")}đ`
                  : value
              }
            />
            <Bar
              yAxisId="left"
              dataKey="count"
              fill="#3b82f6"
              name="Số đơn"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="total"
              fill="#16a34a"
              name="Tổng tiền"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
