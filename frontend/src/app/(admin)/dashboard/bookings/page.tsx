"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BadgeCheck, LoaderCircle } from "lucide-react";
import axiosInstance from "@/lib/axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { getAllEmployee } from "@/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { assignStaff, getAllBookings } from "@/slices/bookingSlice";

interface Booking {
  _id: string;
  user: { name: string; email: string };
  service: { name: string };
  date: string;
  time: string;
  address: string;
  status: string;
}

export default function AdminBookingPage() {
  // const [bookings, setBookings] = useState<Booking[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const { users, isLoading } = useSelector((state: RootState) => state.auth);
  const { bookings } = useSelector((state: RootState) => state.booking);
  const [staffList, setStaffList] = useState([]);

  const handleClick = (booking: Booking) => {
    setSelectedBookingId(booking?._id);
    // fetchStaffList();
    dispatch(getAllEmployee());
    setOpenAssignDialog(true);
  };

  const handleAssignStaff = async (staffId: string, bookingId: string) => {
    dispatch(assignStaff({ bookingId: bookingId, employeeId: staffId }));
    setOpenAssignDialog(false);
  };

  useEffect(() => {
    setLoading(true)
    dispatch(getAllBookings()).then(() => {
      setLoading(false)
    })
  }, []);

  const updateStatus = async (id: string, status: string) => {
    // try {
    //   await axios.post(`/api/admin/bookings/${id}/status`, { status });
    //   setBookings((prev) =>
    //     prev.map((b) => (b._id === id ? { ...b, status } : b))
    //   );
    // } catch (err) {
    //   console.error("Failed to update status", err);
    // }
  };

  console.log(bookings);

  return (
    <section className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold mb-6 text-green-700"
      >
        Booking Management
      </motion.h1>

      {loading ? (
        <div className="flex justify-center py-20 text-gray-500">
          <LoaderCircle className="animate-spin" size={24} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-green-100 text-left text-sm text-green-800 uppercase">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, i) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b hover:bg-gray-50 text-sm"
                >
                  <td className="py-3 px-4">{booking.user.name}</td>
                  <td className="py-3 px-4">{booking.service.name}</td>
                  <td className="py-3 px-4">{booking.date}</td>
                  <td className="py-3 px-4">{booking.time}</td>
                  <td className="py-3 px-4">{booking.address}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`uppercase text-xs px-2 py-1 rounded-full ${
                        booking.status === "done"
                          ? "bg-green-200 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-left space-x-2">
                    {booking.status === "pending" ? (
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          handleClick(booking);
                        }}
                        className="bg-yellow-600 text-white p-2 rounded-md"
                      >
                        Assign
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateStatus(booking._id, "done")}
                        className={`${
                          booking.status === "done"
                            ? "bg-green-200 text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-gray-200 text-gray-700"
                        } p-2 rounded-md`}
                        disabled={booking.status !== "done"}
                      >
                        Done
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <Dialog
            open={openAssignDialog}
            onClose={() => setOpenAssignDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Assign Staff</DialogTitle>
            <DialogContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    {/* <TableCell>Status</TableCell> */}
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((staff, index) => (
                    <TableRow key={staff._id}>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>{staff.phone}</TableCell>
                      {/* <TableCell>{staff.status}</TableCell> */}
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() =>
                            handleAssignStaff(staff._id, selectedBookingId)
                          }
                        >
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </section>
  );
}
