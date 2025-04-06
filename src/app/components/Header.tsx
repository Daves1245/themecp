import React from 'react';

const Header = () => {
  return (
    <header className="border-b py-2">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex space-x-1">
            <div className="w-5 h-8 bg-yellow-400"></div>
            <div className="w-5 h-8 bg-blue-600 mt-1"></div>
            <div className="w-5 h-8 bg-red-500 mt-2"></div>
          </div>
          <span className="ml-2 font-bold text-xl">CODE<span className="text-blue-600">FORCES</span></span>
          <span className="ml-2 text-xs text-gray-500">Sponsored by TON</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>🔔</span>
          <div className="flex space-x-1">
            <span>🇬🇧</span>
            <span>🇷🇺</span>
          </div>
          <div>
            <a href="#" className="text-blue-600">medbar</a> | <a href="#" className="text-blue-600">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;