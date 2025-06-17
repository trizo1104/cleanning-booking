"use client";
import AuthImagePattern from "@/components/skeletons/AuthImagePattern";
import { signUp } from "@/slices/authSlice";
import { AppDispatch } from "@/store/store";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type FormDataSignUp = {
  name: string;
  email: string;
  password: string;
};

function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataSignUp>({
    name: "",
    email: "",
    password: "",
  });

  const { isLoading } = useSelector((state: any) => state.auth);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Input all fields");
    } else {
      try {
        const resAction = await dispatch(signUp(formData));
        if (signUp.fulfilled.match(resAction)) {
          toast.success("Sign up success");
          router.push("/login");
        } else if (signUp.rejected.match(resAction)) {
          toast.error(`Sign up failed: ${resAction.payload}`);
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"></div>
              <h1 className="text-2xl font-bold mt-2">Create account</h1>
              <p className="text-base-content/60">
                Get start with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  className={`input input-bordered w-full`}
                  placeholder="🍍 PineApple Pen"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="relative">
                <input
                  type="email"
                  className={`input input-bordered w-full`}
                  placeholder="PineApplePen@gamil.com"
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
                  className={`input input-bordered w-full`}
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
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
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
                  <Loader className="sixe-5 animiate-spin" />
                  Loading.....
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account? &nbsp;
              <Link href="/login" className="link link-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right */}
      <AuthImagePattern
        title="Keep Your Home Sparkling Clean"
        subtitle="Transform your space with ease, maintain a tidy haven, and enjoy a fresh, organized home."
      />
    </div>
  );
}

export default SignUp;
