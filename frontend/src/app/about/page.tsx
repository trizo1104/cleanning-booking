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
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
            Giới thiệu về công ty chúng tôi
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
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
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-green-600">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-gray-700 text-lg">
              Tạo ra môi trường sống và làm việc sạch sẽ, khỏe mạnh thông qua
              các giải pháp vệ sinh hiệu quả, thân thiện với môi trường và tiết
              kiệm chi phí cho khách hàng.
            </p>
          </div>
          <Image
            src="/assets/mission.jpg"
            alt="Sứ mệnh"
            width={500}
            height={350}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Values */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-blue-50 p-8 rounded-2xl shadow-xl text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-blue-600">Giá trị cốt lõi</h2>
          <ul className="grid md:grid-cols-3 gap-6 text-left text-gray-700">
            <li className="bg-white p-4 rounded-xl shadow-md">
              ✔️ Chất lượng dịch vụ hàng đầu
            </li>
            <li className="bg-white p-4 rounded-xl shadow-md">
              ✔️ Đội ngũ chuyên nghiệp và tận tâm
            </li>
            <li className="bg-white p-4 rounded-xl shadow-md">
              ✔️ Tôn trọng và lắng nghe khách hàng
            </li>
            <li className="bg-white p-4 rounded-xl shadow-md">
              ✔️ Ứng dụng công nghệ hiện đại
            </li>
            <li className="bg-white p-4 rounded-xl shadow-md">
              ✔️ Bảo vệ môi trường
            </li>
            <li className="bg-white p-4 rounded-xl shadow-md">
              ✔️ Phục vụ linh hoạt, đúng hẹn
            </li>
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
          <h2 className="text-3xl font-bold text-orange-600 mb-4">
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
