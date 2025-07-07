"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Layers,
  Notebook,
  Layers2,
  Receipt,
} from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getDetailService } from "@/slices/serviceSlice";
import { createBooking } from "@/slices/bookingSlice";
import { convert12hTo24h, formatVND } from "@/lib/format";

const BookingPage = () => {
  const router = useRouter();

  const { service } = useSelector((state: any) => state.service);
  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [formData, setFormData] = useState<IBookingPayload>({
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
    } else {
      return notFound();
    }
  }, [id, dispatch]);

  useEffect(() => {
    setFormData({
      service: service?._id,
      selectedOptionType: "",
      selectedPrice: "",
      date: "",
      time: "",
      address: "",
      note: "",
    });
  }, [service]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "selectedOptionType") {
      const selectedOption = service?.serviceOptions?.find(
        (s: IServiceOption) => s.optionType === value
      );

      setFormData({
        ...formData,
        selectedOptionType: value,
        selectedPrice: selectedOption?.priceFrom?.toString() || "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        time: convert12hTo24h(formData.time),
      };
      const resultAction = await dispatch(createBooking(payload));

      if (createBooking.fulfilled.match(resultAction)) {
        toast.success("Đặt lịch thành công!");
        router.push("/my-bookings");
      } else if (createBooking.rejected.match(resultAction)) {
        toast.error(`Booking failed: ${resultAction.payload}`);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value={service?._id}>{service?.name}</option>
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
                <Layers2
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
                  {service?.serviceOptions?.map((s: IServiceOption) => (
                    <option key={s._id} value={s.optionType}>
                      {s.optionType}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Selected Price */}
          {formData.selectedPrice && (
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Giá dịch vụ
              </label>
              <div className="relative">
                <Receipt
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="selectedPrice"
                  value={formatVND(Number(formData.selectedPrice))}
                  readOnly
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-xl text-gray-700 cursor-not-allowed"
                />
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
