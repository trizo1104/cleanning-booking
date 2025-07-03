"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
const PaymentFailurePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-10 text-center space-y-5 max-w-md w-full"
      >
        <CheckCircle2 className="w-20 h-20 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800">
          Thanh toán thất bại
        </h2>
        <p className="text-gray-600 text-sm">
          Rất tiếc, giao dịch không thành công. Vui lòng thử lại hoặc liên hệ hỗ
          trợ.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
        >
          Quay về trang chủ
        </Link>
      </motion.div>
    </div>
  );
};

export default PaymentFailurePage;
