import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 p-8 lg:p-12 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
              Join Us Today!
            </h2>
            <p className="text-base lg:text-lg mb-6 lg:mb-8">
              Sign up to access our Deepfake Detection tool.
            </p>

            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-4">
                <LogIn className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" />
              </div>
              <span className="text-sm lg:text-base">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="underline hover:text-pink-300 transition-colors duration-200"
                >
                  Log in here
                </Link>
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-gray-800">
              Sign Up
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <User className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 text-sm lg:text-base border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <Mail className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 text-sm lg:text-base border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <Lock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 text-sm lg:text-base border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <Lock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 text-sm lg:text-base border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 lg:py-3 rounded-lg text-sm lg:text-base hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
