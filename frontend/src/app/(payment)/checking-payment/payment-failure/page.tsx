"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

const PaymentFailurePage = () => {
  const failTime = moment().format("HH:mm:ss - DD/MM/YYYY");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-5 max-w-lg w-full"
      >
        <Image
          src="/assets/Wallet-bro.png"
          alt="Payment Failed"
          width={150}
          height={150}
          className="mx-auto"
        />

        <h2 className="text-2xl font-bold text-red-600">
          Thanh toán thất bại!
        </h2>
        <p className="text-gray-600">
          Rất tiếc, giao dịch không thành công. Bạn có thể thử lại hoặc liên hệ
          hỗ trợ.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-gray-700">
          <p>
            <strong>Thời gian lỗi:</strong> {failTime}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span className="text-red-600 font-medium">Thất bại</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Link
            href="/"
            className="px-5 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Về trang chủ
          </Link>
          <Link
            href="/my-bookings"
            className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            Thử lại thanh toán
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailurePage;
