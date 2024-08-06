import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-semibold">
          <NavLink to="/" className="hover:text-gray-400">Deepfake Detection</NavLink>
        </div>
        <div className="flex space-x-4">
          <NavLink to="/login" className="hover:text-gray-400">Login</NavLink>
          <NavLink to="/signup" className="hover:text-gray-400">Sign Up</NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
