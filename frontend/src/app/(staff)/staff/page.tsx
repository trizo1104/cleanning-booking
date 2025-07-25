"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ClipboardCheck, StickyNote } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  acceptBooking,
  cancelAssignedBooking,
  getAssBookings,
  getPendingBookings,
  updateBookingStatus,
} from "@/slices/employeeSlice";
import { assignStaff } from "@/slices/bookingSlice";
import { fetchCurrentUser, logoutUser } from "@/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function StaffDashboard() {
  const [bookings, setBookings] = useState<IAssignBookings[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>("today");
  const [note, setNote] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const dishpatch = useDispatch<AppDispatch>();
  const { assBookings, pendingBookings } = useSelector(
    (state: any) => state.employee
  );
  const { user } = useSelector((state: any) => state.auth);

  const handleAssignStaff = async (bookingId: string) => {
    const resultAction = await dispatch(
      acceptBooking({ bookingId, employeeId: user?.id })
    );
    if (acceptBooking.fulfilled.match(resultAction)) {
      toast.success("Accept success");
    }
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(getAssBookings());
  }, [dispatch]);

  const updateStatus = async (id: string, status: string) => {
    const resultAction = await dispatch(updateBookingStatus({ id, status }));
    if (updateBookingStatus.fulfilled.match(resultAction)) {
      toast.success("Booking marked as done");
    }
  };

  const cancelAss = async (id: string) => {
    try {
      await dispatch(cancelAssignedBooking(id)).unwrap();
      toast.success("Booking cancelled successfully");
      // Reload bookings after successful cancellation
      dispatch(getAssBookings());
    } catch (error: any) {
      toast.error(error || "Failed to cancel booking");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout success");
    router.push("/login-staff");
  };

  return (
    <section className="min-h-screen bg-gray-50 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-green-700 mb-8"
      >
        Staff Dashboard
      </motion.h1>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap justify-between">
        <div className="flex gap-3 ">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedBooking("today");
              dishpatch(getAssBookings());
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-green-300 to-green-500 text-white shadow-md hover:shadow-lg transition"
          >
            <CalendarDays size={18} /> <span>Today</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedBooking("pending");
              dishpatch(getPendingBookings());
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 text-white shadow-md hover:shadow-lg transition"
          >
            <ClipboardCheck size={18} /> <span>Pending</span>
          </motion.button>
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-300 to-red-500 text-white shadow-md hover:shadow-lg transition"
          >
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Today Bookings */}
      {selectedBooking === "today" &&
        (assBookings?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assBookings
              .filter((b: any) => b.status !== "done")
              .map((booking: any, i: number) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white shadow-lg hover:shadow-xl transition rounded-3xl p-6 border border-gray-100"
                >
                  <p className="text-xl font-semibold text-green-700 mb-2">
                    {booking.service?.name}
                  </p>
                  <div className="text-gray-600 space-y-1 text-sm">
                    <p>
                      <strong className="text-gray-800">Time:</strong>{" "}
                      {booking.date} at {booking.time}
                    </p>
                    <p>
                      <strong className="text-gray-800">Address:</strong>{" "}
                      {booking.address}
                    </p>
                    {!booking.note && (
                      <p>
                        <strong className="text-red-800">
                          <br />
                        </strong>{" "}
                      </p>
                    )}
                    {booking.note && (
                      <p>
                        <strong className="text-red-800">Note:</strong>{" "}
                        {booking.note}
                      </p>
                    )}
                  </div>
                  <div className="flex float-end mt-5 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => cancelAss(booking._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm shadow-md transition"
                    >
                      Cancel Assign
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => updateStatus(booking._id, "done")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm shadow-md transition"
                    >
                      Mark Done
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          <div className="text-center text-black-500 text-sm">
            Hiện tại không có lịch
          </div>
        ))}

      {/* Placeholder Notes tab or Pending */}
      {selectedBooking === "pending" &&
        (pendingBookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingBookings
              .filter((b: any) => b.status !== "done")
              .map((booking: any, i: number) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-5"
                >
                  <p className="font-semibold text-green-700">
                    {booking.service?.name}
                  </p>
                  <p>
                    <strong>Time:</strong> {booking.date} at {booking.time}
                  </p>
                  <p>
                    <strong>Address:</strong> {booking.address}
                  </p>
                  {!booking.note && <br></br>}
                  {booking.note && (
                    <p>
                      <strong className="text-red-800">Note:</strong>{" "}
                      {booking.note}
                    </p>
                  )}
                  <div className="flex float-end mt-4">
                    <button
                      onClick={() => handleAssignStaff(booking?._id)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white  rounded-full px-4 py-2 text-sm transition"
                    >
                      Accept
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          <div className="text-center text-black-500 text-sm">
            Hiện tại không có lịch
          </div>
        ))}
    </section>
  );
}
