import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Check,
  AlertTriangle,
  Image as ImageIcon,
  Server,
  Clock1,
} from "lucide-react";

const ImageDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict/image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "An error occurred during detection" });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center p-4 md:p-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 lg:p-12 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Image Detection
            </h2>
            <p className="text-lg mb-8">
              Upload an image to detect deepfakes and manipulations algorithm.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-2 mr-4">
                  <ImageIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm lg:text-base">
                  Supports various jpeg,png.
                </span>
              </div>
              <div className="flex items-center">
                <div className="bg-white rounded-full p-2 mr-4">
                  <Clock1 className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm lg:text-base">
                  if the server doesnt respond in 20 seconds , refresh.
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-indigo-400 rounded-lg cursor-pointer bg-white hover:bg-indigo-50 transition duration-300 ease-in-out"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full max-h-48 object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-10 h-10 text-indigo-500 mb-2" />
                      <span className="text-sm text-gray-600 text-center">
                        Click or drag to upload an image
                      </span>
                    </div>
                  )}
                </label>
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-600">
                  Selected file: {selectedFile.name}
                </p>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!selectedFile || isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Detecting..." : "Detect"}
              </motion.button>
            </form>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-gray-100 rounded-xl"
              >
                <h3 className="text-2xl font-semibold mb-4 text-indigo-800 flex items-center">
                  <ImageIcon className="w-6 h-6 mr-2" />
                  Detection Result
                </h3>
                <div className="bg-white p-4 rounded-lg shadow">
                  {result.error ? (
                    <div className="flex items-center text-red-500">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      {result.error}
                    </div>
                  ) : (
                    <div className="flex items-center text-green-500">
                      <Check className="w-5 h-5 mr-2" />
                      Detection successful
                    </div>
                  )}
                  <pre className="mt-4 text-sm text-gray-800 overflow-x-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageDetection;
