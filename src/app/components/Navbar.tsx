import React from 'react';

const Navbar = () => {
  return (
    <nav className="border-b py-2 mb-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <ul className="flex space-x-6">
          <li><a href="#" className="text-blue-600 font-semibold">Home</a></li>
          <li><a href="#" className="text-blue-600 font-semibold">Contests</a></li>
          <li><a href="#" className="text-blue-600 font-semibold">Gym</a></li>
          <li><a href="#" className="text-blue-600 font-semibold">Problemset</a></li>
          <li><a href="#" className="text-blue-600 font-semibold">Rating</a></li>
          <li><a href="#" className="text-blue-600 font-semibold">Edu</a></li>
          <li><a href="#" className="text-blue-600 font-semibold">Other</a></li>
        </ul>
        <div className="flex">
          <input type="text" className="border border-gray-300 rounded px-2 py-1 text-sm" placeholder="Search" />
          <button className="ml-1">🔍</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;