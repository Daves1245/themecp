import React from 'react';

const ProfileTabs = () => {
  return (
    <div className="flex flex-wrap rounded-t overflow-hidden">
      {['MEDBAR', 'SETTINGS', 'LISTS', 'BLOG', 'FAVOURITES', 'TEAMS', 'SUBMISSIONS', 'GROUPS', 'CONTESTS', 'PROBLEMSETTING'].map((tab, index) => (
        <a
          key={index}
          href="#"
          className={`px-4 py-2 text-xs font-bold ${index === 0 ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        >
          {tab}
        </a>
      ))}
    </div>
  );
};

export default ProfileTabs;