import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OfferUSPs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    offer: '',
    usps: ['', '', ''],
    selectedFormats: {
      singleImage: false,
      carousel: false,
      video: false,
      story: false,
      founderVideo: false,
      ugc: false,
      tiktokUgc: false,
      tiktokStory: false
    },
    enableDiversityOverrides: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUspChange = (index, value) => {
    const updatedUsps = [...formData.usps];
    updatedUsps[index] = value;
    setFormData({ ...formData, usps: updatedUsps });
  };

  const addUsp = () => {
    setFormData({ ...formData, usps: [...formData.usps, ''] });
  };

  const toggleFormat = (format) => {
    setFormData({
      ...formData,
      selectedFormats: {
        ...formData.selectedFormats,
        [format]: !formData.selectedFormats[format]
      }
    });
  };

  const toggleDiversityOverrides = () => {
    setFormData({
      ...formData,
      enableDiversityOverrides: !formData.enableDiversityOverrides
    });
  };

  const handleNext = () => {
    navigate('/reviews');
  };

  const handleBack = () => {
    navigate('/audience');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900">Offer & USPs</h2>
          <p className="mt-1 text-sm text-gray-500">Define what makes your product valuable and unique.</p>
          
          <div className="mt-6 space-y-8">
            {/* Offer Section */}
            <div>
              <label htmlFor="offer" className="block text-sm font-medium text-gray-700">
                Offer – What is being offered to customers?
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Provide details on the product/collection, any promotion/incentive you wish to include. Add the product/collection URL.
              </p>
              <textarea 
                id="offer" 
                name="offer" 
                rows="3" 
                placeholder="e.g. 50% off our Metabolic Fix / Cellular Hydration collection. https://example.com/products" 
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                value={formData.offer}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* USPs Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unique Selling Points (USPs)
              </label>
              <p className="text-xs text-gray-500 mt-1">
                List 3–5 unique selling points tailored to the audience and pain points you identified earlier. Think about emotional, functional, or lifestyle benefits that truly differentiate your product.
              </p>
              <div className="mt-2 space-y-3">
                {formData.usps.map((usp, index) => (
                  <input 
                    key={index}
                    type="text" 
                    placeholder={`USP ${index + 1}`} 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border" 
                    value={usp}
                    onChange={(e) => handleUspChange(index, e.target.value)}
                  />
                ))}
              </div>
              <button 
                type="button" 
                onClick={addUsp}
                className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add another USP
              </button>
            </div>
            
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Format Selection
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Select one or more ad formats for your creative brief. Different formats will generate specialized content.
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Single Image Format */}
                <div 
                  className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition-colors ${formData.selectedFormats.singleImage ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
                  onClick={() => toggleFormat('singleImage')}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 font-medium text-gray-900">Single Image</h3>
                    <p className="mt-1 text-xs text-gray-500">Static visual with text overlay</p>
                  </div>
                </div>
                
                {/* Carousel Format */}
                <div 
                  className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition-colors ${formData.selectedFormats.carousel ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
                  onClick={() => toggleFormat('carousel')}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h3 className="mt-2 font-medium text-gray-900">Carousel</h3>
                    <p className="mt-1 text-xs text-gray-500">Swipeable multi-card format</p>
                  </div>
                </div>
                
                {/* Video Format */}
                <div 
                  className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition-colors ${formData.selectedFormats.video ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
                  onClick={() => toggleFormat('video')}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 font-medium text-gray-900">Video</h3>
                    <p className="mt-1 text-xs text-gray-500">Standard video format</p>
                  </div>
                </div>
                
                {/* Story Format */}
                <div 
                  className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition-colors ${formData.selectedFormats.story ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
                  onClick={() => toggleFormat('story')}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 font-medium text-gray-900">Story</h3>
                    <p className="mt-1 text-xs text-gray-500">Vertical full-screen format</p>
                  </div>
                </div>
                
                {/* Founder Video Format */}
                <div 
                  className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition-colors ${formData.selectedFormats.founderVideo ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
                  onClick={() => toggleFormat('founderVideo')}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="mt-2 font-medium text-gray-900">Founder Video</h3>
                    <p className="mt-1 text-xs text-gray-500">Brand owner as spokesperson</p>
                  </div>
                </div>
                
                {/* UGC Format */}
                <div 
                  className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition-colors ${formData.selectedFormats.ugc ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
                  onClick={() => toggleFormat('ugc')}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-2 font-medium text-gray-900">UGC</h3>
                    <p className="mt-1 text-xs text-gray-500">User-Generated Content style</p>
                  </div>
                </div>
                
                {/* TikTok UGC Format */}
                <div 
                  className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition-colors ${formData.selectedFormats.tiktokUgc ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
                  onClick={() => toggleFormat('tiktokUgc')}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <h3 className="mt-2 font-medium text-gray-900">TikTok UGC</h3>
                    <p className="mt-1 text-xs text-gray-500">Native-feeling organic content</p>
                  </div>
                </div>
                
                {/* TikTok Story Format */}
                <div 
                  className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition-colors ${formData.selectedFormats.tiktokStory ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
                  onClick={() => toggleFormat('tiktokStory')}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <h3 className="mt-2 font-medium text-gray-900">TikTok Story</h3>
                    <p className="mt-1 text-xs text-gray-500">Emotional story sequence</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Diversity Overrides */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Enable Diversity Overrides</h3>
                  <p className="text-xs text-gray-500">Override the AI diversity selection system</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className={`${
                      formData.enableDiversityOverrides ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    onClick={toggleDiversityOverrides}
                    role="switch"
                    aria-checked={formData.enableDiversityOverrides}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        formData.enableDiversityOverrides ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Diversity Analysis */}
            <div>
              <h3 className="text-sm font-medium text-gray-700">Diversity Analysis</h3>
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
                Next: Visual Assets
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

export default OfferUSPs;
