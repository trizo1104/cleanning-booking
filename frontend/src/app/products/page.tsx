"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchAllProducts } from "@/slices/productSlice";
import { getAllService } from "@/slices/serviceSlice";

export default function ProductList() {
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading } = useSelector((state: any) => state.product);
  const { services } = useSelector((state: any) => state.service);

  const categories = services.map((s: Service) => s.name);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getAllService());
  }, [dispatch]);

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p: Product) => p.service.name === filter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <section className="min-h-screen px-6 py-16 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Dịch vụ của chúng tôi
          </h1>
          <p className="text-lg text-gray-600">
            Chọn loại dịch vụ phù hợp với nhu cầu của bạn
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", ...categories].map((cat, index: number) => (
            <button
              key={index}
              onClick={() => {
                setFilter(cat);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 rounded-full font-medium border transition-all duration-300 text-sm md:text-base ${
                filter === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 text-gray-700 hover:bg-green-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          // layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentProducts.map((product: Product, index: number) => (
            <motion.div
              key={product._id}
              // layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <div className="w-full h-56 relative">
                <Image
                  src="/assets/bg.png"
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-base flex-1 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Thêm vào giỏ
                  </button>
                  <button className="px-4 py-2 text-sm cursor-pointer bg-gray-100 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-200 transition">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full text-sm font-semibold border transition ${
                currentPage === i + 1
                  ? "bg-green-600 text-white border-green-600"
                  : "text-gray-700 border-gray-300 hover:bg-green-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
