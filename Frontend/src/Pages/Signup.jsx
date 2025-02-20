import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import DecorativeSkeleton from "../Skeletons/DecorativeSkeleton";
import { Link } from "react-router-dom";
import { SiApachehbase } from "react-icons/si";
import useAuthstore from "../Store/useAuthstore";
import { Toaster } from "react-hot-toast";

function Signup() {
  const { signup } = useAuthstore();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
      <Toaster />

      {/* Form Section */}
      <div className="h-full w-full lg:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleFormSubmit}
          className="space-y-6 w-full max-w-md bg-base-100 p-8 rounded-xl shadow-lg"
        >
          <div className="mb-8 text-center">
            <SiApachehbase size={70} className="mx-auto text-primary" />
            <h3 className="text-2xl text-base-content mt-4">Sign Up</h3>
            <p className="text-sm text-base-content/70 mt-2">
              Sign up to join the conversation! Connect, share, and enjoy
              endless chats with friends. Your journey begins here!
            </p>
          </div>

          {/* Full Name Input */}
          <div>
            <label className="label">
              <span className="label-text   text-base-content">
                Full Name
              </span>
            </label>
            <input
              value={formData.fullName}
              name="fullName"
              autoComplete="name"
              type="text"
              placeholder="Enter full name"
              className="input input-bordered w-full"
              onChange={handleInputChange}
              aria-label="Full Name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="label">
              <span className="label-text   text-base-content">
                Email
              </span>
            </label>
            <input
              value={formData.email}
              name="email"
              autoComplete="email"
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full "
              onChange={handleInputChange}
              aria-label="Email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="label">
              <span className="label-text   text-base-content">
                Password
              </span>
            </label>
            <div className="relative">
              <input
                value={formData.password}
                name="password"
                autoComplete="new-password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password"
                className="input input-bordered w-full  pr-12"
                onChange={handleInputChange}
                aria-label="Password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => setPasswordVisible((prev) => !prev)}
                aria-label={passwordVisible ? "Hide Password" : "Show Password"}
              >
                {passwordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn btn-primary  w-full">
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <p className="text-sm text-center mt-4 text-base-content/70 ">
            Already have an account?{" "}
            <Link to="/signin" className="link link-primary ">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Decorative Skeleton (only on large screens) */}
      <div className="hidden lg:flex w-1/2 bg-base-300">
        <DecorativeSkeleton />
      </div>
    </div>
  );
}

export default Signup;
