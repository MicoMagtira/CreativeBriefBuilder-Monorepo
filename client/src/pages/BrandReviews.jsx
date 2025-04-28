import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BrandReviews = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNext = () => {
    navigate('/review');
  };

  const handleBack = () => {
    navigate('/offer');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-gray-900">Brand Reviews</h2>
            <span className="ml-2 text-xs text-gray-500">(Optional)</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Upload customer reviews for AI analysis and better brief generation, or skip this step.
          </p>
          
          <div className="mt-6 space-y-4">
            {/* Upload Reviews Button */}
            <div className="w-full">
              <button
                type="button"
                onClick={openFileSelector}
                className="w-full border rounded-md p-2 text-center text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Reviews
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileInput}
                accept=".csv,.docx,.pdf,.txt"
              />
            </div>
            
            {/* Drag and Drop Upload Zone */}
            <div className="bg-white p-8 rounded-lg">
              <div className="flex flex-col items-center justify-center">
                <svg 
                  className="h-12 w-12 text-gray-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Upload Customer Reviews</h3>
                <p className="mt-1 text-sm text-gray-500 text-center">
                  Drag and drop your reviews file or click to browse. We'll analyze the content to enhance your creative brief.
                </p>
                
                <div 
                  className={`mt-4 w-full border-2 border-dashed rounded-lg p-10 text-center ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={openFileSelector}
                >
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Click to upload or drag and drop</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      CSV, DOCX, PDF, or TXT file (up to 10MB)
                    </p>
                  </div>
                </div>
                
                {selectedFile && (
                  <div className="mt-4 text-sm text-gray-500">
                    Selected file: {selectedFile.name}
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
              >
                Generate Summary
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandReviews;
