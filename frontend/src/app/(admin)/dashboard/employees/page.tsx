"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, UserCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  deleteEmployee,
  getAllEmployee,
  signUpStaff,
} from "@/slices/authSlice";
import { formatDateTime } from "@/lib/format";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { toast } from "react-toastify";
import UserFormModal from "@/components/SignUpModal";

export default function AdminEmployeesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { staff, isLoading } = useSelector((state: RootState) => state.auth);
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (id: string) => {
    confirm({
      title: "Delete Employee Account",
      message: "Are you sure you want to delete this employee account?",
      onConfirm: async () => {
        try {
          const resultAction = await dispatch(deleteEmployee(id));
          if (deleteEmployee.fulfilled.match(resultAction)) {
            toast.success(resultAction.payload.message);
          } else if (deleteEmployee.rejected.match(resultAction)) {
            toast.error(`${resultAction.payload}`);
          }
        } catch (error) {
          toast.error("An unexpected error occurred");
        }
      },
    });
  };

  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch]);

  const handleRegister = async (formData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.name
    ) {
      toast.error("Input all fields");
    } else {
      try {
        const resAction = await dispatch(signUpStaff(formData));
        if (signUpStaff.fulfilled.match(resAction)) {
          toast.success("Sign up success");
          setOpenModal(false);
        } else if (signUpStaff.rejected.match(resAction)) {
          toast.error(`Sign up failed: ${resAction.payload}`);
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    }
  };

  console.log(staff);

  return (
    <section className="min-h-screen bg-white p-6 md:p-10">
      <ConfirmDialog />
      <UserFormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleRegister}
        title="Create New Employee Account"
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-2xl font-bold text-green-700">
          Employees Management
        </h1>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Create New Employee
        </button>
      </motion.div>

      {isLoading ? (
        <p className="text-gray-500">Loading employees...</p>
      ) : staff.length === 0 ? (
        <p className="text-gray-500">No employees found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((emp: User, index) => (
            <motion.div
              key={emp._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-xl shadow p-4 bg-gray-50 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-green-800">
                  {emp.name}
                </h2>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    emp.role === "admin"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {emp.role}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{emp.email}</p>
              <p className="text-sm text-gray-500">Phone: {emp?.phone}</p>
              <p className="text-sm text-gray-500">
                Created: {formatDateTime(emp.createdAt)}
              </p>
              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="flex items-center gap-1 text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
