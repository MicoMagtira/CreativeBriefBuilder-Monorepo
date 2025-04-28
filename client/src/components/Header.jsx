import React from 'react';

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center text-blue-600 font-semibold">
          <h1 className="text-xl">Meta Ad Creative Brief Builder</h1>
        </div>
        <div className="text-gray-500 text-sm">
          demo@example.com
        </div>
      </div>
    </header>
  );
};

export default Header;
