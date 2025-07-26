"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthImagePattern from "@/components/skeletons/AuthImagePattern";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { loginStaff } from "@/slices/authSlice";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormDataLogin {
  email: string;
  password: string;
}

function LoginStaff() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    password: "",
  });
  const { isLoading, error } = useSelector((state: any) => state.auth);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Input all fields");
    } else {
      try {
        const resultAction = await dispatch(loginStaff(formData));
        if (loginStaff.fulfilled.match(resultAction)) {
          const role = resultAction.payload?.role;
          console.log(role);
          toast.success("Login success");
          if (role === "staff") {
            router.push("/staff");
          } else if (role === "admin") {
            router.push("/dashboard/admin");
          }
        } else if (loginStaff.rejected.match(resultAction)) {
          toast.error(`Login failed: ${resultAction.payload}`);
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* left */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
            transition-colors"
              ></div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back Staff</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  className={`input input-bordered w-full p-2`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full p-2`}
                  placeholder="∗∗∗∗∗∗∗∗∗∗∗"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* right */}
      <AuthImagePattern
        title="Welcome to a Clean Services!"
        subtitle="Sign in to manage your cleaning tasks and keep your space fresh and organized."
      />
    </div>
  );
}

export default LoginStaff;
