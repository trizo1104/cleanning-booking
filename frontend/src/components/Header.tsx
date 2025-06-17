"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logoutUser, setUser } from "@/slices/authSlice";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Our commitment", href: "/commitment" },
];

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-full mx-auto ">
        <div className="mx-10 flex justify-between items-center py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/assets/cleanning service.jpg"
              alt="Hero image"
              width={50}
              height={50}
            />

            <div className="ml-2 text-xl font-semibold text-gray-800">
              Cleaning Service
            </div>
          </div>

          <div className=" md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>

          <nav className="hidden md:flex space-x-6 items-center">
            <div className="relative group">
              <button
                className="focus:outline-none p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
                aria-label="User menu"
              >
                <CircleUserRound className="w-10 h-10 text-gray-700 hover:text-blue-500" />
              </button>

              <div
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-10 
               opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
              >
                {isAuthenticated ? (
                  <>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
                    >
                      Login
                    </a>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
