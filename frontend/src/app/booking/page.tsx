"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { notFound, useParams, useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, Layers, Notebook } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getAllService, getDetailService } from "@/slices/serviceSlice";

const BookingPage = () => {
  const router = useRouter();

  const { services, service } = useSelector((state: any) => state.service);
  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [formData, setFormData] = useState({
    service: "",
    selectedOptionType: "",
    selectedPrice: "",
    date: "",
    time: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getDetailService(id));
    } else if (!id) {
      dispatch(getAllService());
    } else {
      return notFound();
    }
  }, [id, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Đặt lịch thành công!");
        router.push("/my-bookings");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Đặt lịch thất bại!");
      }
    } catch (err) {
      toast.error("Lỗi kết nối máy chủ!");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-tr from-blue-100 to-white px-6 py-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-10">
          Đặt Lịch Dịch Vụ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Dịch vụ
            </label>
            <div className="relative">
              <Layers
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">-- Chọn dịch vụ --</option>
                {services.length > 0 &&
                  services.map((s: Service) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* serviceOptions */}
          {formData.service && (
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Gói dịch vụ
              </label>
              <div className="relative">
                <Layers
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <select
                  name="selectedOptionType"
                  value={formData.selectedOptionType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">-- Chọn dịch vụ --</option>
                  {services
                    ?.find((s: Service) => s.name === formData.service)
                    ?.serviceOptions?.map((s: IServiceOption) => (
                      <option key={s._id} value={s._id}>
                        {s.optionType} - {s.priceFrom}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Ngày
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Giờ
            </label>
            <div className="relative">
              <Clock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Địa chỉ
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Đường ABC, Quận 1, TP.HCM"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Ghi chú
            </label>
            <div className="relative">
              <Notebook
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Ghi chú thêm nếu có..."
                rows={3}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Đặt Lịch Ngay
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default BookingPage;
