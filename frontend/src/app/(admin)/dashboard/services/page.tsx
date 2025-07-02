"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  addNewService,
  deleteService,
  getAllService,
  UpdateService,
} from "@/slices/serviceSlice";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { toast } from "react-toastify";
import ServiceFormModal from "@/components/ServiceFormModal";

export default function AdminServicesPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { services, isLoading } = useSelector((state: any) => state.service);
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getAllService());
  }, []);

  const handleDelete = async (id: string) => {
    confirm({
      title: "Delete Review",
      message: "Are you sure you want to delete this review?",
      onConfirm: async () => {
        try {
          const resultAction = await dispatch(deleteService(id));
          if (deleteService.fulfilled.match(resultAction)) {
            toast.success(resultAction.payload);
            dispatch(getAllService());
          }
        } catch (error) {
          toast.error("An unexpected error occurred");
        }
      },
    });
  };

  const handleAdd = () => {
    setSelectedService(null);
    setEditMode(false);
    setOpenModal(true);
  };

  const handleEdit = (service: any) => {
    setSelectedService(service);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      if (editMode && selectedService) {
        const res = await dispatch(
          UpdateService({ ...selectedService, ...data })
        );
        if (UpdateService.fulfilled.match(res)) {
          toast.success("Service updated");
        }
      } else {
        const res = await dispatch(addNewService(data));
        if (addNewService.fulfilled.match(res)) {
          toast.success("Service added");
        }
      }

      dispatch(getAllService());
      setOpenModal(false);
    } catch (error) {
      toast.error("Failed to save service");
    }
  };

  return (
    <section className="p-6 md:p-10 bg-white min-h-screen">
      <ConfirmDialog />
      <ServiceFormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        defaultValues={selectedService}
        title={editMode ? "Edit Service" : "Add New Service"}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold text-green-700">
          Services Management
        </h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Add Service
        </button>
      </motion.div>

      {isLoading ? (
        <p className="text-gray-500">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-gray-500">No services found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service: Service, i: number) => (
            <motion.div
              key={service._id}
              className="border rounded-xl shadow hover:shadow-md p-4 transition bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                {service.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {service.description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service._id)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
