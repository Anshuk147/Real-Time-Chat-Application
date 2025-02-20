import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SiApachehbase } from "react-icons/si";
import useAuthstore from "../Store/useAuthstore";
import { Toaster } from "react-hot-toast";
import DecorativeSkeleton from "../Skeletons/DecorativeSkeleton";

function Login() {
  const { login } = useAuthstore();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <Toaster />

      {/* Left Section (Form) */}
      <div className="w-full h-full lg:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-lg border border-base-300"
        >
          {/* Logo & Heading */}
          <div className="mb-6 text-center">
            <SiApachehbase size={60} className="mx-auto text-primary" />
            <h3 className="text-2xl text-base-content mt-4">Sign in</h3>
            <p className="text-sm text-base-content/70 mt-2">
              Connect with friends and stay in touch. Chat, share, and explore a world of conversations.
            </p>
          </div>

          {/* Email Input */}
          <div>
            <label className="label">
              <span className="label-text text-sm text-base-content/80">Email</span>
            </label>
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label className="label">
              <span className="label-text text-sm text-base-content/80">Password</span>
            </label>
            <div className="relative">
              <input
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password"
                className="input input-bordered w-full pr-12"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-base-content/70"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-6">
            Sign in
          </button>

          {/* Register Link */}
          <p className="text-sm text-center mt-4 text-base-content/70">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Register here
            </Link>
          </p>
        </form>
      </div>

      {/* Right Section (Decorative Image) - Hidden on Small Screens */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-base-300">
        <DecorativeSkeleton />
      </div>
    </div>
  );
}

export default Login;
