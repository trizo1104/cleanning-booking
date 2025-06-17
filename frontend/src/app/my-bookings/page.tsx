"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/slices/authSlice";

type Booking = {
  _id: string;
  service: {
    name: string;
    icon?: string;
  };
  date: string;
  time: string;
  address: string;
  note?: string;
  status: "pending" | "assigned" | "done";
  rating?: number;
  review?: string;
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/booking/my-bookings",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-blue-600 mb-8"
        >
          Lịch Đặt Dịch Vụ Của Bạn
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-400" size={36} />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Chưa có lịch đặt nào.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-lg font-bold text-blue-700 flex items-center gap-2">
                    {booking.service.icon && (
                      <span className="text-2xl">{booking.service.icon}</span>
                    )}
                    {booking.service.name}
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold text-white ${
                      booking.status === "pending"
                        ? "bg-yellow-400"
                        : booking.status === "assigned"
                        ? "bg-blue-500"
                        : "bg-green-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Ngày:</strong> {booking.date}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Thời gian:</strong> {booking.time}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Địa chỉ:</strong> {booking.address}
                </p>
                {booking.note && (
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Ghi chú:</strong> {booking.note}
                  </p>
                )}

                <div className="text-right">
                  {booking.status === "done" && booking.rating == null && (
                    <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                      <Star size={18} />
                      Đánh giá dịch vụ
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
