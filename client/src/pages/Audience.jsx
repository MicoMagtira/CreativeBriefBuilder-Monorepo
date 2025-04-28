import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Audience = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: {
      male: false,
      female: false
    },
    ageMin: '',
    ageMax: '',
    habits: '',
    painPoints: '',
    emotions: '',
    values: ''
  });

  const handleGenderChange = (gender) => {
    setFormData({
      ...formData,
      gender: {
        ...formData.gender,
        [gender]: !formData.gender[gender]
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    navigate('/offer');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900">Target Audience</h2>
          <p className="mt-1 text-sm text-gray-500">Define who you're trying to reach with this creative.</p>
          
          <div className="mt-6 space-y-6">
            {/* Gender and Age Range in a single row */}
            <div className="flex flex-wrap gap-6">
              {/* Gender Selection */}
              <div className="min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Gender (optional)</label>
                <div className="mt-2 flex space-x-6">
                  <div className="flex items-center">
                    <input 
                      id="male" 
                      type="checkbox" 
                      checked={formData.gender.male}
                      onChange={() => handleGenderChange('male')}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="male" className="ml-2 text-sm text-gray-700">Male</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="female" 
                      type="checkbox" 
                      checked={formData.gender.female}
                      onChange={() => handleGenderChange('female')}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="female" className="ml-2 text-sm text-gray-700">Female</label>
                  </div>
                </div>
              </div>
              
              {/* Age Range Min */}
              <div>
                <label htmlFor="ageMin" className="block text-sm font-medium text-gray-700">Age Range (Min)</label>
                <input 
                  type="number" 
                  name="ageMin" 
                  id="ageMin" 
                  min="1"
                  max="100"
                  placeholder="e.g. 25" 
                  className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border" 
                  value={formData.ageMin}
                  onChange={handleChange}
                />
              </div>
              
              {/* Age Range Max */}
              <div>
                <label htmlFor="ageMax" className="block text-sm font-medium text-gray-700">Age Range (Max)</label>
                <input 
                  type="number" 
                  name="ageMax" 
                  id="ageMax" 
                  min="1"
                  max="100"
                  placeholder="e.g. 35" 
                  className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border" 
                  value={formData.ageMax}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Habits */}
            <div>
              <label htmlFor="habits" className="block text-sm font-medium text-gray-700">Habits (optional)</label>
              <textarea 
                id="habits" 
                name="habits" 
                rows="3" 
                placeholder="Describe daily habits — both in real life (e.g., working, commuting) and online (e.g., social platforms, apps, buying behavior)." 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                value={formData.habits}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* Customer Pain Points */}
            <div>
              <label htmlFor="painPoints" className="block text-sm font-medium text-gray-700">Customer Pain Points</label>
              <textarea 
                id="painPoints" 
                name="painPoints" 
                rows="3" 
                placeholder="What specific problem(s) does the product solve for the customer? Be detailed — include emotional and functional issues." 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                value={formData.painPoints}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* Emotions to Align With */}
            <div>
              <label htmlFor="emotions" className="block text-sm font-medium text-gray-700">Emotions to Align With (optional)</label>
              <textarea 
                id="emotions" 
                name="emotions" 
                rows="3" 
                placeholder="What emotions should the product generate or reinforce in the audience? (e.g., confidence, security, ambition)" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                value={formData.emotions}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* Audience Values and Beliefs */}
            <div>
              <label htmlFor="values" className="block text-sm font-medium text-gray-700">Audience Values and Beliefs (optional)</label>
              <textarea 
                id="values" 
                name="values" 
                rows="3" 
                placeholder="What core values or beliefs does this audience hold? (e.g., sustainability, independence, productivity)" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                value={formData.values}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* Customer Mindstates Info Box */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-600">Customer Mindstates</h3>
                  <p className="mt-1 text-sm text-blue-500">
                    Our AI will analyze your inputs and automatically identify the most relevant customer mindstates for your target audience. This helps create more emotionally resonant ad creative without requiring you to manually select mindstates.
                  </p>
                </div>
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next: Offer & USPs
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

export default Audience;
