import React, { useState } from 'react';
import { toast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useBriefId } from '../contexts/BriefIdContext';
import { useSaveBriefSection } from '../hooks/useSaveBriefSection';

const BrandInfo = () => {
  const navigate = useNavigate();
  const { briefId, setBriefId } = useBriefId();
  const { loading, error, success, saveSection } = useSaveBriefSection();
  const [formData, setFormData] = useState({
    clientName: '',
    industry: '',
    productUrl: '',
    productList: '',
    brandGuidelines: '',
  });
  const [errors, setErrors] = useState({ clientName: '', industry: '', productList: '' });

  const validate = () => {
    const newErrors = { clientName: '', industry: '', productList: '' };
    let hasError = false;
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client/Brand Name is required.';
      hasError = true;
    }
    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required.';
      hasError = true;
    }
    if (!formData.productList.trim()) {
      newErrors.productList = 'Product List is required.';
      hasError = true;
    }
    setErrors(newErrors);
    return !hasError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = { ...formData };
    if (briefId) data.briefId = briefId;
    const returnedBriefId = await saveSection('brandInfo', data);
    if (returnedBriefId) {
      setBriefId(returnedBriefId);
      toast({ title: 'Brand Info Saved', description: 'Brand information saved successfully!', variant: 'default' });
      navigate('/audience');
    }
  };
  // Removed duplicate hook and handler declarations below this point.
  // (All duplicate blocks removed for lint compliance)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900">Brand Information</h2>
          <p className="mt-1 text-sm text-gray-500">Let's start with some basic information about the brand and project.</p>
          
          <div className="mt-6">
            <form onSubmit={handleSubmit}>
  {(errors.clientName || errors.industry || errors.productList) && (
    <div className="mb-4 text-red-600 font-semibold bg-red-50 border border-red-200 rounded p-2">
      {errors.clientName && <div>{errors.clientName}</div>}
      {errors.industry && <div>{errors.industry}</div>}
      {errors.productList && <div>{errors.productList}</div>}
    </div>
  )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client/Brand Name</label>
                  <input 
                    type="text" 
                    name="clientName" 
                    id="clientName" 
                    placeholder="e.g. Artah" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border" 
                    value={formData.clientName}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                  <div className="mt-1 relative">
                    <select 
                      id="industry" 
                      name="industry" 
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm h-10"
                      value={formData.industry}
                      onChange={handleChange}
                    >
                      <option value="">Select industry...</option>
                      <option value="health">Health & Wellness</option>
                      <option value="tech">Technology</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="fashion">Fashion</option>
                      <option value="food">Food & Beverage</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="productUrl" className="block text-sm font-medium text-gray-700">Product/Brand URL</label>
                <input 
                  type="text" 
                  name="productUrl" 
                  id="productUrl" 
                  placeholder="e.g. https://artah.co/products/nad" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border" 
                  value={formData.productUrl}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between">
                  <label htmlFor="productList" className="block text-sm font-medium text-gray-700">Product List</label>
                  <span className="text-xs text-green-600 font-medium">Required</span>
                </div>
                <textarea 
                  id="productList" 
                  name="productList" 
                  rows="4" 
                  placeholder="Enter comma-separated list of products: e.g. 10 Complex Mushroom Gummies, Vitality Tincture, Clarity Capsules" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                  value={formData.productList}
                  onChange={handleChange}
                ></textarea>
                <p className="mt-2 text-sm text-orange-600 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  <span>⚠️ These products will appear in the 'Product List' section of your brief. Adding products here gives you full control over what appears in your brief.</span>
                </p>
              </div>
              
              <div className="mt-6">
                <label htmlFor="brandGuidelines" className="block text-sm font-medium text-gray-700">Brand Guidelines (optional)</label>
                <textarea 
                  id="brandGuidelines" 
                  name="brandGuidelines" 
                  rows="2" 
                  placeholder="Enter brand guidelines or notes" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                  value={formData.brandGuidelines}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700">Branding Guidelines</h3>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload brand guidelines</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, Word, CSV, or image files up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-end space-y-2">
                {loading && <span className="text-blue-600">Saving...</span>}
                {error && <span className="text-red-600">{error}</span>}
                {success && <span className="text-green-600">Saved!</span>}
                <button 
                  type="submit" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  Next: Audience
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandInfo;
