"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function OurCommitment() {
  return (
    <section className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
            Cam kết của chúng tôi
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang lại dịch vụ vệ sinh chất lượng cao nhất với
            sự minh bạch, tận tâm và hiệu quả.
          </p>
        </motion.div>

        {/* Commitments */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Chất lượng vượt trội",
              desc: "Chúng tôi không ngừng cải tiến quy trình làm việc để đảm bảo mọi dịch vụ đều đạt tiêu chuẩn cao nhất.",
              icon: "/assets/quality.png",
            },
            {
              title: "Đội ngũ tận tâm",
              desc: "Nhân viên được đào tạo bài bản, luôn phục vụ khách hàng với tinh thần trách nhiệm và chuyên nghiệp.",
              icon: "/assets/team.png",
            },
            {
              title: "Thân thiện với môi trường",
              desc: "Sử dụng các sản phẩm làm sạch an toàn, thân thiện với sức khỏe và môi trường.",
              icon: "/assets/eco.png",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Banner CTA */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-green-100 p-10 rounded-3xl shadow-lg text-center"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Trải nghiệm dịch vụ vệ sinh khác biệt ngay hôm nay!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Liên hệ với chúng tôi để được tư vấn miễn phí và hỗ trợ tận tâm
            nhất.
          </p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition">
            Liên hệ ngay
          </button>
        </motion.div>
      </div>
    </section>
  );
}
