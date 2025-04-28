import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          © 2025 CreativeBrief. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
