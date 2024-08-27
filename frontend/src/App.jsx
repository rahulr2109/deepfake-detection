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
import ProtectedRoute from "./utils/ProtectedRoute";
import { createContext } from "react";

export const UserContext = createContext();

const App = () => {
  const [trigger, setTrigger] = React.useState(true);

  return (
    <Router>
      <UserContext.Provider value={{ trigger, setTrigger }}>
        <div className="flex flex-col h-screen">
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/image" />} />
              <Route
                path="/image"
                element={
                  <ProtectedRoute>
                    <ImageDetection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/video"
                element={
                  <ProtectedRoute>
                    <VideoDetection />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Layout>
        </div>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
};

export default App;
