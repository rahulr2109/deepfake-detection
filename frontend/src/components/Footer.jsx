import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6"
    >
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-center text-sm lg:text-base">
          &copy; Debug Dynamo, 2024.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
