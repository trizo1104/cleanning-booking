import Image from "next/image";
import React, { useState } from "react";

function RegisterService() {
  const stepsImg = [
    {
      image: "/assets/choose.png",
      bg: "from-blue-100 to-blue-50",
    },
    {
      image: "/assets/fill.png",
      bg: "from-yellow-100 to-yellow-50",
    },
    {
      image: "/assets/schedule.png",
      bg: "from-green-100 to-green-50",
    },
    {
      image: "/assets/payment.png",
      bg: "from-purple-100 to-purple-50",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Chọn dịch vụ",
      description:
        "Chọn loại dịch vụ bạn cần và chọn dịch vụ phù hợp với sinh hoạt hàng ngày.",
    },
    {
      number: 2,
      title: "Nhập thông tin chi tiết công việc",
      description:
        "Khách hàng chọn loại công việc, số lượng thiết bị cần dọn dẹp và dịch vụ bổ trợ theo yêu cầu.",
    },
    {
      number: 3,
      title: "Chọn thời gian",
      description:
        "Khách hàng chọn thời gian làm việc và thực hiện đặt lịch làm việc.",
    },
    {
      number: 4,
      title: "Xác nhận và thanh toán",
      description:
        "Khách hàng kiểm tra và xác nhận thông tin, sau đó tiến hành thanh toán qua các cổng như bPay, MoMo, ZaloPay, VNPA, VietQR...",
    },
  ];

  const [selectedStep, setSelectedStep] = useState(0);

  const handleStepClick = (index: number) => {
    setSelectedStep(index);
  };
  const imageIndex =
    selectedStep >= stepsImg.length ? stepsImg.length - 1 : selectedStep;

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
        Bạn đã sẵn sàng sử dụng dịch vụ chưa?
      </h2>
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group flex items-start p-6 bg-orange-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up cursor-pointer ${
                selectedStep === index ? "bg-orange-200" : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => handleStepClick(index)}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                {step.number}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-navy-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2 flex justify-center relative">
          <div
            className={`bg-gradient-to-br ${stepsImg[imageIndex].bg} p-6 rounded-3xl shadow-xl transition-transform duration-300 h-[600px] flex items-center justify-center`}
          >
            <Image
              src={stepsImg[imageIndex].image}
              alt={`Illustration for step ${selectedStep + 1}`}
              width={400}
              height={300}
              className="object-contain transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterService;
