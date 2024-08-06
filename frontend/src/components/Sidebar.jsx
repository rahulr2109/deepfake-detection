import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white shadow-lg">
      <nav className="mt-10">
        <NavLink to="/image" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700" activeClassName="bg-gray-700">
          Image Detection
        </NavLink>
        <NavLink to="/video" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700" activeClassName="bg-gray-700">
          Video Detection
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
