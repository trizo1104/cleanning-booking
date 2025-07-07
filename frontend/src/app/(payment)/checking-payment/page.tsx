"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const PaymentStatusPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<"loading" | "redirecting">("loading");

  const transactionId = searchParams.get("apptransid");

  useEffect(() => {
    const checkStatus = async () => {
      if (!transactionId) return router.push("/payment-failure");
      try {
        const res = await axios.get(
          `http://localhost:8080/api/payment-zalo/check-payment-status/${transactionId}`
        );
        if (res.data.success && res.data.status === "paid") {
          setStatus("redirecting");
          setTimeout(
            () => router.push("/checking-payment/payment-success"),
            1500
          );
        } else {
          setTimeout(
            () => router.push("/checking-payment/payment-failure"),
            1500
          );
        }
      } catch (err) {
        setTimeout(
          () => router.push("/checking-payment/payment-failure"),
          1500
        );
      }
    };
    checkStatus();
  }, [transactionId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#fce4ec]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl px-8 py-12 text-center max-w-md w-full border border-gray-100"
      >
        <div className="flex flex-col items-center space-y-6">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <h1 className="text-2xl font-bold text-gray-800">
            Đang kiểm tra trạng thái thanh toán ZaloPay...
          </h1>
          <p className="text-gray-500 text-sm max-w-sm">
            Vui lòng không đóng trình duyệt trong khi chúng tôi xác nhận giao
            dịch của bạn.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentStatusPage;
