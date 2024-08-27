import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { UserContext } from "../App";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setTrigger } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      setTrigger((prev) => !prev);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 p-8 lg:p-12 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
              Welcome Back!
            </h2>
            <p className="text-base lg:text-lg mb-6 lg:mb-8">
              Log in to access our Deepfake Detection tool.
            </p>
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-2 mr-4">
                <LogIn className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" />
              </div>
              <span className="text-sm lg:text-base">Secure Login</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-4">
                <LogIn className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" />
              </div>
              <span className="text-sm lg:text-base">
                New user?{" "}
                <Link
                  to="/signup"
                  className="underline hover:text-pink-300 transition-colors duration-200"
                >
                  Sign up here
                </Link>
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-gray-800">
              Login
            </h3>
            <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
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
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-3 py-2 text-sm lg:text-base border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 lg:py-3 rounded-lg text-sm lg:text-base hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <Loader className="animate-spin inline-block" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <div className="mt-4 lg:mt-6 text-center">
              <a
                href="#"
                className="text-indigo-600 text-sm lg:text-base hover:text-indigo-800 transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Login;
