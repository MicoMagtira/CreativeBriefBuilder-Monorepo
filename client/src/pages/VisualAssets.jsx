import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VisualAssets = () => {
  const navigate = useNavigate();
  const adsFileInputRef = useRef(null);
  const moodboardFileInputRef = useRef(null);
  const [adsIsDragging, setAdsIsDragging] = useState(false);
  const [moodboardIsDragging, setMoodboardIsDragging] = useState(false);
  const [adsFiles, setAdsFiles] = useState([]);
  const [moodboardFiles, setMoodboardFiles] = useState([]);

  const handleNext = () => {
    navigate('/reviews');
  };

  const handleBack = () => {
    navigate('/offer');
  };

  // Handlers for Top Performing Ads upload
  const handleAdsDragOver = (e) => {
    e.preventDefault();
    setAdsIsDragging(true);
  };

  const handleAdsDragLeave = (e) => {
    e.preventDefault();
    setAdsIsDragging(false);
  };

  const handleAdsDrop = (e) => {
    e.preventDefault();
    setAdsIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAdsFiles(e.dataTransfer.files);
    }
  };

  const handleAdsFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleAdsFiles(e.target.files);
    }
  };

  const handleAdsFiles = (files) => {
    const newFiles = Array.from(files);
    setAdsFiles([...adsFiles, ...newFiles]);
  };

  const openAdsFileSelector = () => {
    if (adsFileInputRef.current) {
      adsFileInputRef.current.click();
    }
  };

  // Handlers for Visual Moodboard upload
  const handleMoodboardDragOver = (e) => {
    e.preventDefault();
    setMoodboardIsDragging(true);
  };

  const handleMoodboardDragLeave = (e) => {
    e.preventDefault();
    setMoodboardIsDragging(false);
  };

  const handleMoodboardDrop = (e) => {
    e.preventDefault();
    setMoodboardIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleMoodboardFiles(e.dataTransfer.files);
    }
  };

  const handleMoodboardFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleMoodboardFiles(e.target.files);
    }
  };

  const handleMoodboardFiles = (files) => {
    const newFiles = Array.from(files);
    setMoodboardFiles([...moodboardFiles, ...newFiles]);
  };

  const openMoodboardFileSelector = () => {
    if (moodboardFileInputRef.current) {
      moodboardFileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900">Visual Assets</h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload images for top performing ads as reference, and upload visual moodboard samples to guide the creative direction.
          </p>
          
          <div className="mt-6 space-y-10">
            {/* Top Performing Ads Upload */}
            <div>
              <h3 className="text-base font-medium text-gray-700">Top Performing Ads (Reference)</h3>
              <div 
                className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center ${
                  adsIsDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                }`}
                onDragOver={handleAdsDragOver}
                onDragLeave={handleAdsDragLeave}
                onDrop={handleAdsDrop}
                onClick={openAdsFileSelector}
              >
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      Drag and drop image files here, or click to browse
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Upload reference images from your best-performing ads. Supported formats: JPG, PNG, up to 10MB per file.
                    </p>
                  </div>
                  <input
                    ref={adsFileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleAdsFileInput}
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
              </div>
              
              {/* Display selected ads files */}
              {adsFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Selected files:</h4>
                  <ul className="mt-2 pl-4 list-disc space-y-1">
                    {adsFiles.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Visual Moodboard Upload */}
            <div>
              <h3 className="text-base font-medium text-gray-700">Visual Moodboard</h3>
              <div 
                className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center ${
                  moodboardIsDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                }`}
                onDragOver={handleMoodboardDragOver}
                onDragLeave={handleMoodboardDragLeave}
                onDrop={handleMoodboardDrop}
                onClick={openMoodboardFileSelector}
              >
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      Drag and drop image files here, or click to browse
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Upload sample visuals that represent the desired look, feel, and style for the new creative. Supported formats: JPG, PNG, up to 10MB per file.
                    </p>
                  </div>
                  <input
                    ref={moodboardFileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleMoodboardFileInput}
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
              </div>
              
              {/* Display selected moodboard files */}
              {moodboardFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Selected files:</h4>
                  <ul className="mt-2 pl-4 list-disc space-y-1">
                    {moodboardFiles.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next: Brand Reviews
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

export default VisualAssets;