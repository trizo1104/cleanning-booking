"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getDetailService } from "@/slices/serviceSlice";
import { notFound, useParams } from "next/navigation";
import { fetchProductsService } from "@/slices/productSlice";
import Image from "next/image";
import RegisterService from "@/components/RegisterService";
import { settings, settingsHero } from "@/components/carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { getAllReview } from "@/slices/bookingSlice";
import { formatDateTime } from "@/lib/format";

const ServiceDetail = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const dispatch = useDispatch<AppDispatch>();
  const { service, isLoading } = useSelector((state: any) => state.service);
  const { products } = useSelector((state: any) => state.product);
  const { review } = useSelector((state: any) => state.booking);

  useEffect(() => {
    if (id) {
      dispatch(getDetailService(id));
      dispatch(fetchProductsService(id));
      dispatch(getAllReview(id));
    } else {
      return notFound();
    }
  }, [id, dispatch]);

  if (isLoading || !service) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-lg text-blue-600 animate-pulse">
          Đang tải dữ liệu dịch vụ...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 pt-5">
      <section className="relative mx-10 h-[450px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 z-0 ">
          <Slider {...settingsHero}>
            {service?.imageUrls.map((image: string, index: number) => (
              <div key={index}>
                <div
                  className="w-full h-[450px]  bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`,
                  }}
                ></div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="text-center text-white animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight drop-shadow-xl">
              {service?.name}
            </h1>
            <p className="mt-4 text-xl max-w-2xl mx-auto opacity-90">
              {service?.description}
            </p>
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 animate-fade-in-left">
            Sản Phẩm Có Thể Hữu Ích Cho Bạn
          </h2>
          <div className="relative">
            <Slider {...settings} className="w-full">
              {products.map((p: Product, index: number) => (
                <div
                  key={index}
                  className="px-3 py-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="group bg-white cursor-pointer p-6 rounded-2xl shadow-inner hover:shadow-2xl  hover:bg-gold-50 transition-all duration-300 overflow-hidden text-center h-full flex flex-col justify-between">
                    <div className="flex-grow">
                      <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl">
                        <Image
                          src="/assets/bg.png"
                          alt={p.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-navy-900 line-clamp-1 group-hover:text-navy-700 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-gray-600 text-base sm:text-lg line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    <button className="mt-6 w-full bg-gradient-to-r from-blue-300 to-blue-500 text-white px-4 py-2 rounded-full font-semibold text-sm sm:text-base hover:from-navy-700 hover:to-navy-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-14">
            <div className="bg-white p-6 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-400">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                Gói Dịch Vụ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service?.serviceOptions.map(
                  (option: IServiceOption, index: number) => (
                    <div
                      key={index}
                      className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {option.optionType}
                      </h3>
                      <p className="text-gray-700 mt-2">
                        Giá từ: {option?.priceFrom?.toLocaleString("vi-VN")} VNĐ
                      </p>
                      {option?.description && (
                        <p className="text-gray-500 mt-2 text-sm">
                          {option?.description}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-600">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                Chi Tiết Dịch Vụ
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {service?.details}
              </p>
              {service?.notes && (
                <p className="text-yellow-700 mt-4 italic">
                  <strong>Lưu ý:</strong> {service?.notes}
                </p>
              )}
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-400">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                Quy Trình Dịch Vụ
              </h2>
              <div className="space-y-4">
                {service?.procedureSteps.map(
                  (step: IprocedureSteps, index: number) => (
                    <div key={index}>
                      <div
                        className={`text-left text-lg font-semibold transition-colors `}
                      >
                        Step {index + 1}: {step.step}
                      </div>

                      <div className="text-gray-700">
                        {step.stepDescription}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                Tiêu Chuẩn An Toàn
              </h2>
              <div className="space-y-4">
                {service?.safetyStandards.map((safe: string, index: number) => (
                  <div key={index}>
                    <div
                      className={`text-left text-lg font-semibold transition-colors `}
                    >
                      {safe}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-600">
              <RegisterService />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-600">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                Phản hồi của khách hàng
              </h2>
              {review.length > 0 ? (
                review.map((feedback: IGetReview) => (
                  <div
                    key={feedback?._id}
                    className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-2xl mx-auto"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="font-semibold text-blue-600 text-base leading-none">
                        Đánh giá:
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={feedback.rating >= star ? "#facc15" : "none"}
                            stroke="#facc15"
                            strokeWidth={1.5}
                            className="w-7 h-7 mt-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.75.75 0 011.04 0l2.644 2.653 3.671.534a.75.75 0 01.416 1.279l-2.655 2.592.627 3.655a.75.75 0 01-1.088.791L12 13.347l-3.274 1.726a.75.75 0 01-1.088-.79l.627-3.656-2.655-2.592a.75.75 0 01.416-1.279l3.671-.534L11.48 3.5z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 italic mb-4">
                      {feedback?.comment}
                    </p>
                    <div className="flex justify-between">
                      <p className="text-blue-500 font-semibold">
                        {feedback?.user.name}
                      </p>
                      <p className="text-gray-400 font-semibold">
                        {formatDateTime(feedback?.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600">
                  Chưa có phản hồi nào
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24 space-y-6">
              <div className="bg-blue-50 p-6 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-1200">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Thông Tin Thêm
                </h3>
                <p className="text-gray-700">
                  <strong>Thời gian:</strong> {service?.duration} phút
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Chính sách bảo hành:</strong>{" "}
                  {service?.warrantyPolicy}
                </p>
                {service?.technicianInfo && (
                  <p className="text-gray-700 mt-2">
                    <strong>Nhân viên:</strong> {service?.technicianInfo}
                  </p>
                )}
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-1400">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Lợi Ích
                </h3>
                <ul className="space-y-2">
                  {service?.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 text-center animate-fade-in-up animation-delay-1600">
                <Link
                  href={`/booking/${id}`}
                  className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Đặt Dịch Vụ Ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
