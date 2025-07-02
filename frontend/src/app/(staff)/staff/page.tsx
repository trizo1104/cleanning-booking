"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ClipboardCheck, StickyNote } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  acceptBooking,
  getAssBookings,
  getPendingBookings,
  updateBookingStatus,
} from "@/slices/employeeSlice";
import { assignStaff } from "@/slices/bookingSlice";
import { getAssBookings, updateBookingStatus } from "@/slices/employeeSlice";
import { fetchCurrentUser } from "@/slices/authSlice";

export default function StaffDashboard() {
  const [bookings, setBookings] = useState<IAssignBookings[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [note, setNote] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const dishpatch = useDispatch<AppDispatch>();
  const { assBookings, pendingBookings } = useSelector(
    (state: any) => state.employee
  );
  const { user } = useSelector((state: any) => state.auth);
  const { assBookings } = useSelector((state: any) => state.employee);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    dispatch(getAssBookings());
  }, []);

  const updateStatus = async (id: string, status: string) => {
    dispatch(updateBookingStatus({ id, status }));
  };

  const handleAcceptBooking = (bookingId: string, staffId: string) => {
    dishpatch(acceptBooking({ bookingId: bookingId, employeeId: staffId }));
  };

  const saveNote = async () => {
    if (!selectedBooking) return;
    try {
      await axios.put(`/api/staff/bookings/${selectedBooking}/note`, { note });
      setNote("");
      alert("Note saved");
    } catch (err) {
      console.error("Save note failed", err);
    }
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
      <div className="mb-6 flex justify-center gap-4">
        <button
          onClick={() => {
            setSelectedBooking(null);
            dishpatch(getAssBookings());
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-green-100 text-green-800 hover:bg-green-200 transition"
        >
          <CalendarDays size={16} /> Today
        </button>
        <button
          onClick={() => {
            setSelectedBooking("pending");
            dishpatch(getPendingBookings());
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
        >
          <ClipboardCheck size={16} /> Pending
        </button>
        <button
          onClick={() => setSelectedBooking("note")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
        >
          <StickyNote size={16} /> Notes
        </button>
      </div>

      {/* Today Bookings */}
      {selectedBooking === null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assBookings
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
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => updateStatus(booking._id, "done")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Mark Done
                  </button>
                  <button
                    onClick={() => setSelectedBooking(booking._id)}
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg text-sm"
                  >
                    Add Note
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      )}

      {/* Notes Form */}
      {selectedBooking &&
        selectedBooking !== "pending" &&
        selectedBooking !== "note" && (
          <div className="max-w-xl mx-auto bg-white p-6 mt-6 rounded-xl shadow">
            <textarea
              placeholder="Write your note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-green-500 min-h-[120px]"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={saveNote}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Save Note
              </button>
            </div>
          </div>
        )}

      {/* Placeholder Notes tab or Pending */}
      {(selectedBooking === "note" || selectedBooking === "pending") && (
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
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAcceptBooking(booking?._id, user?._id)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setSelectedBooking(booking._id)}
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg text-sm"
                  >
                    Add Note
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </section>
  );
}
