import React, { useState } from 'react';

const ImageDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch('http://127.0.0.1:8000/predict/image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Image Detection</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
        >
          Detect
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg w-full">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Detection Result</h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-gray-800">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ImageDetection;
