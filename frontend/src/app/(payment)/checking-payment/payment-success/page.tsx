"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

const PaymentSuccessPage = () => {
  const paymentTime = moment().format("HH:mm:ss - DD/MM/YYYY");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-5 max-w-lg w-full"
      >
        <Image
          src="/assets/Cash_Payment_bro.png"
          alt="Payment Success"
          width={150}
          height={150}
          className="mx-auto"
        />
        <h2 className="text-2xl font-bold text-green-600">
          Thanh toán thành công!
        </h2>
        <p className="text-gray-600">
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Lịch hẹn của bạn đã được
          xác nhận.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-gray-700">
          <p>
            <strong>Thời gian thanh toán:</strong> {paymentTime}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span className="text-green-600 font-medium">Đã thanh toán</span>
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
            className="px-5 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          >
            Xem lịch của tôi
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
