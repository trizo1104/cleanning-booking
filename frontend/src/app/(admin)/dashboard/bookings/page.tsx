"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
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
  Tooltip,
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
  const dispatch = useDispatch<AppDispatch>();
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const { users } = useSelector((state: RootState) => state.auth);
  const { bookings, isLoading } = useSelector(
    (state: RootState) => state.booking
  );

  const handleClick = (booking: Booking) => {
    setSelectedBookingId(booking?._id);
    dispatch(getAllEmployee());
    setOpenAssignDialog(true);
  };

  const handleAssignStaff = async (staffId: string, bookingId: string) => {
    dispatch(assignStaff({ bookingId: bookingId, employeeId: staffId }));
    setOpenAssignDialog(false);
  };

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

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

      {isLoading ? (
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
                          : booking.status === "cancelled"
                          ? "bg-red-200 text-black"
                          : booking.status === "paid"
                          ? "bg-orange-200-200 text-yellow-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-left space-x-2">
                    {booking.status === "pending" && (
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
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: 10,
                backgroundColor: "#f9fafb",
              },
            }}
          >
            <DialogTitle
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                bgcolor: "#1976d2",
                color: "white",
              }}
            >
              Assign Staff
            </DialogTitle>

            <DialogContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((staff) => (
                    <TableRow
                      key={staff._id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f1f1f1",
                        },
                        transition: "all 0.3s",
                      }}
                    >
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span>{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{staff.phone}</TableCell>
                      <TableCell>
                        <Tooltip title="Assign this staff">
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() =>
                              handleAssignStaff(staff._id, selectedBookingId)
                            }
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              boxShadow: 2,
                              transition: "transform 0.2s",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          >
                            Assign
                          </Button>
                        </Tooltip>
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
