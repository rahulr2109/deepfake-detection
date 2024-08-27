import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Image,
  Video,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
// import AvatarDropdown from "./AvatarDropdown";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { trigger, setTrigger } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [trigger]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const mainMenuItems = [
    { to: "/", text: "Home", Icon: Home },
    { to: "/image", text: "Image Detection", Icon: Image },
    { to: "/video", text: "Video Detection", Icon: Video },
  ];

  const authMenuItems = [
    { to: "/login", text: "Login", Icon: LogIn },
    { to: "/signup", text: "Sign Up", Icon: UserPlus },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 lg:w-4/5 w-full">
        <div className="flex justify-between items-center h-16">
          <NavLink
            to="/"
            className="text-xl font-bold hover:text-pink-300 transition-colors duration-200"
          >
            Deepfake Detection
          </NavLink>
          <div className="hidden md:flex items-center justify-center flex-grow">
            {mainMenuItems.map(({ to, text, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className="relative px-3 py-2 mx-2 rounded-md text-sm font-medium group flex items-center"
              >
                <Icon className="w-5 h-5 mr-1" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-900">
                  {text}
                </span>
                <motion.span
                  className="absolute inset-0 rounded-md bg-white"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </NavLink>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {!isAuthenticated &&
              authMenuItems.map(({ to, text, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="relative overflow-hidden px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                >
                  <span className="absolute inset-0 w-full h-full transition duration-300 group-hover:bg-gradient-to-br from-pink-400 to-purple-600"></span>
                  <span className="absolute inset-0 w-full h-full border-2 border-white rounded-full"></span>
                  <span className="relative flex items-center justify-center">
                    <Icon className="w-4 h-4 mr-1" />
                    <span className="relative">{text}</span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 transform translate-y-1 bg-white group-hover:translate-y-0"></span>
                </NavLink>
              ))}
            {isAuthenticated && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-3 h-10 bg-red-500  text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 mb-2 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-4 mr-2" />
                  Logout
                </motion.button>
              </>
            )}
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none hover:text-pink-300 transition-colors duration-200"
          >
            <Menu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-indigo-800 text-white z-50 shadow-lg overflow-y-auto flex flex-col"
          >
            <div className="p-5 flex-grow">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-white focus:outline-none hover:text-pink-300 transition-colors duration-200"
              >
                <X />
              </button>
              <div className="text-2xl font-bold mb-8 mt-4">
                Deepfake Detection
              </div>
              <div className="space-y-4">
                {mainMenuItems.map(({ to, text, Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className="flex items-center px-4 py-3 hover:bg-indigo-600 rounded-md transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {text}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="p-5 bg-indigo-900">
              {!isAuthenticated &&
                authMenuItems.map(({ to, text, Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className="flex items-center justify-center px-4 py-3 hover:bg-pink-500 rounded-md transition-colors duration-200 mb-2"
                    onClick={toggleMenu}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {text}
                  </NavLink>
                ))}
              {isAuthenticated && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center p-3  bg-red-600 w-full text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 mb-2 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="container mx-auto p-4 flex justify-center items-center min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Navbar;
export { Layout };
