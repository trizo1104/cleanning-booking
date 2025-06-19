"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/slices/authSlice";
import { formatVND } from "@/lib/format";
import Link from "next/link";

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
  status: "pending" | "assigned" | "done" | "cancelled";
  rating?: number;
  review?: string;
  selectedOptionType: string;
  selectedPrice: string;
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
            {bookings?.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-blue-700 flex items-center gap-3 text-lg font-semibold">
                    {booking.service.icon && (
                      <span className="text-2xl">{booking.service.icon}</span>
                    )}
                    <span className="flex items-baseline gap-2">
                      <span className="font-bold text-blue-700">
                        {booking.service.name}
                      </span>
                      <span className="text-black">-</span>
                      <span className="text-sm text-gray-500">
                        {booking.selectedOptionType}
                      </span>
                    </span>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold text-white ${
                      booking.status === "pending"
                        ? "bg-yellow-400"
                        : booking.status === "assigned"
                        ? "bg-blue-500"
                        : booking.status === "cancelled"
                        ? "bg-red-500"
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
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Giá:</strong>{" "}
                  {formatVND(Number(booking.selectedPrice))}
                </p>
                {booking.note !== "" ? (
                  <p className="text-sm text-gray-500 mb-1">
                    <strong className="text-orange-500">Ghi chú:</strong>{" "}
                    {booking.note}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Ghi chú:</strong> Không có
                  </p>
                )}

                <div className="text-right">
                  {booking.status === "pending" && booking.rating == null && (
                    <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                      Hủy dịch vụ
                    </button>
                  )}
                </div>

                <div className="text-right">
                  {booking.status === "done" && booking.rating == null && (
                    <Link
                      href={`/my-bookings/${booking._id}/review`}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      <Star size={18} />
                      Đánh giá dịch vụ
                    </Link>
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
