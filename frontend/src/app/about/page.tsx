"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
            Giới thiệu về công ty chúng tôi
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Chúng tôi là công ty dịch vụ vệ sinh chuyên nghiệp, mang đến không
            gian sống và làm việc sạch sẽ, an toàn và tiện nghi cho mọi khách
            hàng.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-gray-700 text-base sm:text-lg">
              Tạo ra môi trường sống và làm việc sạch sẽ, khỏe mạnh thông qua
              các giải pháp vệ sinh hiệu quả, thân thiện với môi trường và tiết
              kiệm chi phí cho khách hàng.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/assets/sumenh.jpg"
              alt="Sứ mệnh"
              width={500}
              height={350}
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-blue-50 p-6 sm:p-8 rounded-2xl shadow-xl text-center space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
            Giá trị cốt lõi
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-left text-gray-700">
            {[
              "✔️ Chất lượng dịch vụ hàng đầu",
              "✔️ Đội ngũ chuyên nghiệp và tận tâm",
              "✔️ Tôn trọng và lắng nghe khách hàng",
              "✔️ Ứng dụng công nghệ hiện đại",
              "✔️ Bảo vệ môi trường",
              "✔️ Phục vụ linh hoạt, đúng hẹn",
            ].map((value, i) => (
              <li
                key={i}
                className="bg-white p-4 rounded-xl shadow-md text-sm sm:text-base"
              >
                {value}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-4">
            Hãy để chúng tôi giúp bạn làm sạch không gian sống hôm nay!
          </h2>
          <button className="mt-4 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition">
            Đăng ký dịch vụ ngay
          </button>
        </motion.div>
      </div>
    </div>
  );
}
