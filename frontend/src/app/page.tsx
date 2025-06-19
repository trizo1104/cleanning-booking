"use client";
import Slider from "react-slick";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  ChevronDownIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { getAllService } from "@/slices/serviceSlice";
import Link from "next/link";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faqs, steps, features, ImageURL } from "@/components/data";
import { settingsHero, settings } from "@/components/carousel";
import ProtectRoute from "@/components/ProtectRoute";

// const createSlug = (title: string) =>
//   title
//     .toLowerCase()
//     .replace(/ /g, "-")
//     .replace(/[^a-z0-9-]/g, "");

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { services } = useSelector((state: any) => state.service);

  useEffect(() => {
    dispatch(getAllService());
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ProtectRoute allowedRoles={["user"]}>
      <div className="my-5">
        <section
          id="home"
          className="relative mx-10 h-[450px] rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Slider {...settingsHero}>
              {ImageURL.map((image, index) => (
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

          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 text-white animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-md">
              Professional Cleaning Services
            </h1>
            <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl drop-shadow-sm">
              Transform your space with our expert cleaning solutions. Spotless
              results, every time!
            </p>
            <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
              Book Now
            </button>
          </div>
        </section>

        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 my-10"
          id="services"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 animate-fade-in-left">
            Our Services
          </h2>
          <div className="relative">
            <Slider {...settings} className="select-none">
              {services.map((service: Service, index: number) => {
                // const slug = `${createSlug(service._id)}`;
                return (
                  <div key={index} className="p-2 select-none">
                    <Link href={`/service/${service._id}`} className="block">
                      <div
                        className="group bg-white cursor-pointer p-8 rounded-xl shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 text-center"
                        onDragStart={(e) => e.preventDefault()}
                      >
                        <div className="text-5xl mb-4 transition duration-300 group-hover:scale-110 ">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </div>
        </section>

        <section
          id="blog"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 my-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 animate-fade-in-left">
            All the Amenities You Need
          </h2>
          <div className="relative">
            <Slider {...settings}>
              {blogData.map((blog, index) => (
                <div key={index} className="p-2">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={400}
                        height={250}
                        className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {blog.description}
                      </p>
                      <Link
                        href={blog.link}
                        className="text-blue-600 hover:underline font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        <section
          id="features"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:px-8 my-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 animate-fade-in-left">
            Why Choose Us
          </h2>

          <div className="mb-12 relative rounded-2xl overflow-hidden shadow-lg w-full h-[300px]">
            <Image
              src="/assets/home.png"
              alt="photo"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl cursor-default shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <span className="text-5xl text-orange-500 transform transition-transform duration-300 hover:scale-110">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto py-4 my-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 animate-fade-in-left">
            How to Book a Cleaning Service
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${step.bg} p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300 animate-fade-in-up`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-xl font-bold text-gray-800">
                    {index + 1}
                  </div>
                </div>
                <div className="relative w-full h-52 mb-6">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </div>

                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-center text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="faq"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b rounded-2xl from-blue-50 to-white"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 animate-fade-in-left">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none hover:bg-blue-50 transition-colors duration-200"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {index + 1}. {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-6 h-6 text-blue-600 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? "max-h-96 py-4" : "max-h-0 py-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ProtectRoute>
  );
}

const blogData = [
  {
    title: "Top 5 Cleaning Tips for a Spotless Home",
    description:
      "Learn expert tips to keep your home sparkling clean with minimal effort.",
    link: "/blog/cleaning-tips",
    image: "/assets/avatar.png",
  },
  {
    title: "Why Regular Office Cleaning Matters",
    description:
      "Discover the benefits of maintaining a clean and healthy workplace.",
    link: "/blog/office-cleaning",
    image: "/assets/avatar.png",
  },
  {
    title: "Eco-Friendly Cleaning Solutions",
    description:
      "Explore sustainable cleaning methods that are safe for your family and the planet.",
    link: "/blog/eco-friendly-cleaning",
    image: "/assets/avatar.png",
  },
  {
    title: "Eco-Friendly Cleaning Solutions",
    description:
      "Explore sustainable cleaning methods that are safe for your family and the planet.",
    link: "/blog/eco-friendly-cleaning",
    image: "/assets/avatar.png",
  },
  {
    title: "Eco-Friendly Cleaning Solutions",
    description:
      "Explore sustainable cleaning methods that are safe for your family and the planet.",
    link: "/blog/eco-friendly-cleaning",
    image: "/assets/avatar.png",
  },
  {
    title: "Eco-Friendly Cleaning Solutions",
    description:
      "Explore sustainable cleaning methods that are safe for your family and the planet.",
    link: "/blog/eco-friendly-cleaning",
    image: "/assets/avatar.png",
  },
  {
    title: "Eco-Friendly Cleaning Solutions",
    description:
      "Explore sustainable cleaning methods that are safe for your family and the planet.",
    link: "/blog/eco-friendly-cleaning",
    image: "/assets/avatar.png",
  },
];
