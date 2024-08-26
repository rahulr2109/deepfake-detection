import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/Navbar";

import ImageDetection from "./components/ImageDetection";
import VideoDetection from "./components/VideoDetection";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/image" />} />
            <Route path="/image" element={<ImageDetection />} />
            <Route path="/video" element={<VideoDetection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
