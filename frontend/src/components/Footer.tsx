"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex justify-between ">
          {/* Company Information */}
          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Image
                src="/assets/cleanning service.jpg"
                alt="Cleaning Service Logo"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <h3 className="text-2xl font-bold text-gray-400">
                Cleaning Service
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">
              <span className="block font-medium">
                Cleaning Service Co., Ltd.
              </span>
              Vinhomes Grand Park, District 9, Ho Chi Minh City
              <br />
              <span className="block mt-2">
                <strong>Business Code:</strong> 0313723825
                <br />
                <strong>Representative:</strong> Mr. Nguyễn Thiên Hưng
                <br />
                <strong>Position:</strong> Director
                <br />
                <strong>Phone:</strong> 0000 000 000
                <br />
                <strong>Email:</strong> support@cleaningservice.com
              </span>
            </p>
          </div>

          {/* Company Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-300 transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="hover:text-blue-300 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <span
                  //   href="/privacy"
                  className="hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </span>
              </li>
              <li>
                <span
                  //   href="/terms"
                  className="hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/hourly-cleaning"
                  className="hover:text-blue-300 transition-colors"
                >
                  Hourly Home Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/deep-cleaning"
                  className="hover:text-blue-300 transition-colors"
                >
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/office-cleaning"
                  className="hover:text-blue-300 transition-colors"
                >
                  Office Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/window-cleaning"
                  className="hover:text-blue-300 transition-colors"
                >
                  Grocery Shopping
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            © 2025 - 2025 Cleaning Service Co., Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
