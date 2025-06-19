"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { reviewBooking } from "@/slices/bookingSlice";
import { toast } from "react-toastify";

export default function ReviewBookingPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: any) => state.booking);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setMessage("Vui lòng chọn số sao đánh giá");
      return;
    }
    try {
      if (id) {
        const resultAction = await dispatch(
          reviewBooking({ id, data: { rating, comment: review.trim() } })
        );

        if (reviewBooking.fulfilled.match(resultAction)) {
          toast.success("Review success");
          router.push("/my-bookings");
        } else if (reviewBooking.rejected.match(resultAction)) {
          toast.error(`Review failed: ${resultAction.payload}`);
        }
      }
    } catch (error) {
      setMessage("Lỗi kết nối máy chủ.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-tr from-blue-100 to-white py-16 px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">
            Đánh giá dịch vụ
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Stars */}
            <div className="text-center">
              <label className="block text-gray-700 font-medium mb-3">
                Đánh giá chất lượng
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`cursor-pointer transition ${
                      (hoverRating || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill={(hoverRating || rating) >= star ? "#facc15" : "none"}
                  />
                ))}
              </div>
            </div>

            {/* Review Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhận xét chi tiết
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                placeholder="Hãy chia sẻ trải nghiệm của bạn..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
            >
              {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
            </motion.button>

            {/* Message */}
            {message && (
              <p className="text-center text-sm text-red-500 mt-2">{message}</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
