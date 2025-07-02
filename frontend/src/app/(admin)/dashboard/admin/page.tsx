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
import axios from "axios";
import { User, ClipboardList, Users, Briefcase, Activity } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    services: 0,
    employees: 0,
    users: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/admin/dashboard");
      setStats(res.data.stats);
      setChartData(res.data.chartData);
    };
    fetchData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  const cards = [
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
  ];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Activity size={18} />
          Bookings by Day
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
