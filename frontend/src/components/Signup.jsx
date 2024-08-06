import React from 'react';

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100%] bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>
        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
