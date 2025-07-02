"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Trash2, MessageCircle } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { deleteReview, getAllReviewForAdmin } from "@/slices/bookingSlice";
import { formatDateTime } from "@/lib/format";
import { toast } from "react-toastify";
import { useConfirmDialog } from "@/components/useConfirmDialog";

export default function AdminReviewsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { review, isLoading } = useSelector((state: any) => state.booking);
  const [selectedRating, setSelectedRating] = useState<number | "">("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedOptionType, setSelectedOptionType] = useState<string>("");
  const { confirm, ConfirmDialog } = useConfirmDialog();

  useEffect(() => {
    dispatch(getAllReviewForAdmin());
  }, []);

  const filteredReviews = review.filter((r: IGetReview) => {
    const matchRating = selectedRating === "" || r.rating === selectedRating;
    const matchService =
      selectedService === "" ||
      r.service?.name?.toLowerCase() === selectedService.toLowerCase();
    const matchOption =
      selectedOptionType === "" ||
      r.booking?.selectedOptionType === selectedOptionType;
    return matchRating && matchService && matchOption;
  });

  const uniqueServices: string[] = Array.from(
    new Set(review.map((r: IGetReview) => r.service?.name).filter(Boolean))
  );

  const uniqueOptions: string[] = Array.from(
    new Set(
      review
        .map((r: IGetReview) => r.booking?.selectedOptionType)
        .filter(Boolean)
    )
  );

  const handleDelete = (id: string) => {
    confirm({
      title: "Delete Review",
      message: "Are you sure you want to delete this review?",
      onConfirm: async () => {
        try {
          const resultAction = await dispatch(deleteReview(id));
          if (deleteReview.fulfilled.match(resultAction)) {
            toast.success(resultAction.payload);
            dispatch(getAllReviewForAdmin());
          }
        } catch (error) {
          toast.error("An unexpected error occurred");
        }
      },
    });
  };

  return (
    <section className="min-h-screen bg-white p-6 md:p-10">
      <ConfirmDialog />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold text-green-700 mb-8"
      >
        User Reviews
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <select
          value={selectedRating}
          onChange={(e) =>
            setSelectedRating(e.target.value ? Number(e.target.value) : "")
          }
          className="border rounded px-3 py-2 text-sm text-gray-700"
        >
          <option value="">All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="border rounded px-3 py-2 text-sm text-gray-700"
        >
          <option value="">All Services</option>
          {uniqueServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        <select
          value={selectedOptionType}
          onChange={(e) => setSelectedOptionType(e.target.value)}
          className="border rounded px-3 py-2 text-sm text-gray-700"
        >
          <option value="">All Option Types</option>
          {uniqueOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : filteredReviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review: IGetReview, index: number) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border rounded-xl p-5 bg-gray-50 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-green-700">
                    {review.user?.name || "Unknown User"}
                  </span>
                  {" reviewed "}
                  <span className="font-medium">
                    {review.service?.name || "Unknown Service"}
                  </span>{" "}
                  {" | "}
                  <span className="font-medium">
                    {review.booking?.selectedOptionType || "Unknown Service"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <div className="text-gray-700 text-sm flex items-start gap-2">
                <MessageCircle size={16} className="mt-1 text-green-600" />
                <p>{review.comment}</p>
              </div>

              <div className="flex justify-between mt-3">
                <div className="text-xs text-gray-400 mt-2">
                  {formatDateTime(review.createdAt)}
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
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
