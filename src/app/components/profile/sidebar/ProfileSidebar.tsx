import React from 'react';
import AttentionBox from './AttentionBox';
import UserInfoBox from './UserInfoBox';
import TopRatedBox from './TopRatedBox';

const ProfileSidebar = () => {
  return (
    <div className="space-y-4">
      <AttentionBox />
      <UserInfoBox />
      <TopRatedBox />
    </div>
  );
};

export default ProfileSidebar;