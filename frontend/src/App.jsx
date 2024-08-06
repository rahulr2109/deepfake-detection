import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ImageDetection from './components/ImageDetection';
import VideoDetection from './components/VideoDetection';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-10">
            <Routes>
              <Route path="/" element={<Navigate to="/image" />} />
              <Route path="/image" element={<ImageDetection />} />
              <Route path="/video" element={<VideoDetection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
