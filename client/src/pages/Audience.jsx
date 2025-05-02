import React, { useState } from 'react';
import { toast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useBriefId } from '../contexts/BriefIdContext';
import { useSaveBriefSection } from '../hooks/useSaveBriefSection';

const Audience = () => {
  const navigate = useNavigate();
  const { briefId, setBriefId } = useBriefId();
  const { loading, error, success, saveSection } = useSaveBriefSection();
  const [formData, setFormData] = useState({
    gender: {
      male: false,
      female: false
    },
    ageRange: '',
    habits: '',
    painPoints: '',
    emotions: '',
    values: ''
  });
  const [errors, setErrors] = useState({ ageRange: '', painPoints: '' });

  const validate = () => {
    const newErrors = { ageRange: '', painPoints: '' };
    let hasError = false;
    if (!formData.ageRange.trim()) {
      newErrors.ageRange = 'Age Range is required.';
      hasError = true;
    }
    if (!formData.painPoints.trim()) {
      newErrors.painPoints = 'Customer Pain Points are required.';
      hasError = true;
    }
    setErrors(newErrors);
    return !hasError;
  };

  const handleGenderChange = (gender) => {
    setErrors({ ...errors });
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
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Re-run validation after updating form data
    const newErrors = { ageRange: '', painPoints: '' };
    if (!newFormData.ageRange.trim()) {
      newErrors.ageRange = 'Age Range is required.';
    }
    if (!newFormData.painPoints.trim()) {
      newErrors.painPoints = 'Customer Pain Points are required.';
    }
    setErrors(newErrors);
  };

  const handleNext = async () => {
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const data = {
      ageRange: formData.ageRange,
      gender: formData.gender,
      customerPainPoints: formData.painPoints,
      emotionsToAlignWith: formData.emotions,
      audienceValuesAndBeliefs: formData.values,
      habitsAndDemographics: formData.habits,
    };
    if (briefId) data.briefId = briefId;
    const returnedBriefId = await saveSection('audience', data);
    if (returnedBriefId) {
      setBriefId(returnedBriefId);
      toast({ title: 'Audience Saved', description: 'Audience section saved successfully!', variant: 'default' });
      navigate('/offer');
    }
  };
  // Removed duplicate hook and handler declarations below this point.
  // (All duplicate blocks removed for lint compliance)

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
              
              {/* Age Range as a single field */}
              <div>
                <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">Age Range</label>
                <input 
                  type="text" 
                  name="ageRange" 
                  id="ageRange" 
                  placeholder="e.g., 13-19" 
                  className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border" 
                  value={formData.ageRange}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Customer Pain Points - moved up */}
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
            
            {/* Renamed "Habits" to "Habits and Demographics" */}
            <div>
              <label htmlFor="habits" className="block text-sm font-medium text-gray-700">Habits and Demographics (optional)</label>
              <textarea 
                id="habits" 
                name="habits" 
                rows="3" 
                placeholder="Describe daily habits, activities, and lifestyle patterns (e.g., working routines, commuting habits, app usage, hobbies)." 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                value={formData.habits}
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
            {(errors.ageRange || errors.painPoints) && (
              <div className="mb-4 text-red-600 font-semibold bg-red-50 border border-red-200 rounded p-2">
                {errors.ageRange && <div>{errors.ageRange}</div>}
                {errors.painPoints && <div>{errors.painPoints}</div>}
              </div>
            )}
            {loading && <span className="text-blue-600">Saving...</span>}
            {error && <span className="text-red-600">{error}</span>}
            {success && <span className="text-green-600">Saved!</span>}
            <div className="mt-8 flex justify-between items-end space-y-2">
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
              {loading && <span className="text-blue-600">Saving...</span>}
              {error && <span className="text-red-600">{error}</span>}
              {success && <span className="text-green-600">Saved!</span>}
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
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
