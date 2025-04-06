import React from 'react';

const ProfileInfo = () => {
  const profileData = {
    username: 'medbar',
    role: 'Pupil',
    university: 'University of Central Florida',
    contestRating: 1313,
    maxRating: { value: 1352, type: 'pupil' },
    contribution: 0,
    friends: 35,
    email: 'da101580@knights.ucf.edu',
    lastVisit: 'online now',
    registeredAgo: '4 years ago',
    blogEntries: 0
  };

  return (
    <div className="relative">
      <div className="mb-4">
        <h2 className="text-green-500 text-base m-0">{profileData.role}</h2>
        <h1 className="text-green-500 text-2xl my-1">{profileData.username}</h1>
        <p className="text-sm my-1">From <a href="#" className="text-blue-600">{profileData.university}</a></p>
      </div>

      <div className="md:pr-48">
        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-yellow-500">🏆</span>
            <span className="font-bold">Contest rating:</span>
            <span className="text-green-500">{profileData.contestRating}</span>
            <span className="text-gray-600 text-sm">(max. {profileData.maxRating.type}, {profileData.maxRating.value})</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-yellow-400">⭐</span>
            <span className="font-bold">Contribution:</span>
            <span>{profileData.contribution}</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-blue-600">👥</span>
            <span className="font-bold">Friend of:</span>
            <span>{profileData.friends} users</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-yellow-400">⭐</span>
            <a href="#" className="text-blue-600">My friends</a>
          </div>

          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-gray-600">⚙️</span>
            <a href="#" className="text-blue-600">Change settings</a>
          </div>

          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-gray-600">✉️</span>
            <span>{profileData.email}</span>
            <span className="text-gray-400 text-sm">(not visible)</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="font-bold">Last visit:</span>
            <span className="text-green-600 font-bold">{profileData.lastVisit}</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="font-bold">Registered:</span>
            <span>{profileData.registeredAgo}</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-gray-600">📝</span>
            <a href="#" className="text-blue-600">Blog entries ({profileData.blogEntries})</a>
            <span>,</span>
            <a href="#" className="text-blue-600">comments</a>
          </div>

          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-gray-600">✏️</span>
            <a href="#" className="text-blue-600">Write new entry</a>
          </div>

          <div className="flex items-center space-x-1">
            <span className="w-5 text-center text-gray-600">💬</span>
            <a href="#" className="text-blue-600">View my talks</a>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 w-40 text-center md:block hidden">
        <div className="w-40 h-40 bg-gray-100 rounded mx-auto flex items-center justify-center">
          <div className="text-gray-300 text-6xl">👤</div>
        </div>
        <a href="#" className="text-blue-600 text-xs mt-2 inline-block">Change photo</a>
      </div>
    </div>
  );
};

export default ProfileInfo;