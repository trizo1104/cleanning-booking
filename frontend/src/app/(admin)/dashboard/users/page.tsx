"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteUser, getAllUser, signUp } from "@/slices/authSlice";
import { formatDateTime } from "@/lib/format";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { toast } from "react-toastify";
import UserFormModal from "@/components/SignUpModal";

export default function AdminUsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading } = useSelector((state: RootState) => state.auth);
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (id: string) => {
    confirm({
      title: "Delete User Account",
      message: "Are you sure you want to delete this User account?",
      onConfirm: async () => {
        try {
          const resultAction = await dispatch(deleteUser(id));
          if (deleteUser.fulfilled.match(resultAction)) {
            toast.success(resultAction.payload.message);
            dispatch(getAllUser());
          } else if (deleteUser.rejected.match(resultAction)) {
            toast.error(`${resultAction.payload}`);
          }
        } catch (error) {
          toast.error("An unexpected error occurred");
        }
      },
    });
  };

  useEffect(() => {
    dispatch(getAllUser());
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
        const resAction = await dispatch(signUp(formData));
        if (signUp.fulfilled.match(resAction)) {
          toast.success("Sign up success");
          dispatch(getAllUser());
          setOpenModal(false);
        } else if (signUp.rejected.match(resAction)) {
          toast.error(`Sign up failed: ${resAction.payload}`);
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    }
  };

  console.log(users);

  return (
    <section className="min-h-screen bg-white p-6 md:p-10">
      <ConfirmDialog />
      <UserFormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleRegister}
        title="Create New User Account"
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-2xl font-bold text-green-700">Users Management</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Create New User
        </button>
      </motion.div>

      {isLoading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border rounded-xl shadow p-4 bg-gray-50 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <User className="text-green-600" size={24} />
                <div>
                  <p className="text-lg font-semibold text-green-800">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Phone: {user.phone}</p>
              <p className="text-sm text-gray-500">
                Created: {formatDateTime(user.createdAt)}
              </p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(user._id)}
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
