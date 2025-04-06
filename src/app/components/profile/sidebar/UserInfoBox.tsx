import React from 'react';

const UserInfoBox = () => {
  return (
    <div className="border border-gray-200 rounded overflow-hidden mt-4">
      <h3 className="bg-gray-100 m-0 px-4 py-2 text-sm font-medium border-b border-gray-200">→ medbar</h3>
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center space-x-1 mb-1">
            <span className="w-5 text-center text-yellow-500">🏆</span>
            <span className="font-bold">Rating:</span>
            <span className="text-green-500">1313</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-yellow-400">⭐</span>
            <span className="font-bold">Contribution:</span>
            <span>0</span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded mr-2 flex items-center justify-center">
            <div className="text-gray-300 text-xl">👤</div>
          </div>
          <span className="text-gray-700">medbar</span>
        </div>

        <ul className="list-none p-0 m-0 space-y-1">
          {[
            'Settings', 'Blog', 'Favourites', 'Teams', 'Submissions',
            'Problemsetting', 'Groups', 'Talks', 'Contests'
          ].map((link, index) => (
            <li key={index} className="flex items-center">
              <span className="text-gray-400 mr-2">•</span>
              <a href="#" className="text-blue-600">{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfoBox;