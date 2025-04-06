'use client';

import React, { useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ProfileTabs from './components/profile/ProfileTabs';
import ProfileInfo from './components/profile/ProfileInfo';
import ProfileSidebar from './components/profile/sidebar/ProfileSidebar';
import RatingGraph from '@/components/RatingGraph';
import ProblemHeatmap from './components/profile/graphs/ProblemHeatmap';
import TagsPieGraph from '@/components/tagsPieGraph';
import ProblemRatingsGraph from './components/profile/graphs/ProblemRatings';
import StatTable from '@/components/StatsTable';
import UnsolvedProblemsComponent from './components/profile/tables/ProblemsAttempted';
import useStore from '@/types/store';
import { loadUserData } from '@/types/transitions';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="text-red-600 text-xl">{message}</div>
  </div>
);

const CodeForcesProfile = () => {
  const user = useStore(state => state.userObject);
  const submissions = useStore(state => state.userStats.submissions);
  const contests = useStore(state => state.userStats.contests);
  const filters = useStore(state => state.filters);

  useEffect(() => {
    const handle = 'medbar';
    loadUserData(handle).catch(console.error);
  }, []);

  useEffect(() => {
    console.log("User: ", user);
    console.log("Submissions: ", submissions);
    console.log("Contests: ", contests);
    console.log("Filters: ", filters);
  }, [user, submissions, contests, filters]);

  if (submissions.status === 'loading' || 
      contests.status === 'loading' || 
      filters.status === 'loading' || 
      filters.status === 'idle') {
    return <LoadingSpinner />;
  }

  if (submissions.status === 'error') {
    return <ErrorDisplay message={submissions.message} />;
  }
  if (contests.status === 'error') {
    return <ErrorDisplay message={contests.message} />;
  }
  if (filters.status === 'error') {
    return <ErrorDisplay message={filters.message} />;
  }

  if (!user.handle) {
    return <ErrorDisplay message="No user data available" />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="rounded shadow-sm overflow-hidden mb-6">
          <ProfileTabs />
          <div className="flex flex-col md:flex-row p-6">
            <div className="md:w-2/3 md:pr-6 mb-6 md:mb-0">
              <ProfileInfo />
            </div>
            <div className="md:w-1/3">
              <ProfileSidebar />
            </div>
          </div>
        </div>
        <RatingGraph />
        <StatTable />
        <ProblemHeatmap />
        <TagsPieGraph />
        <ProblemRatingsGraph />
        <UnsolvedProblemsComponent />
      </div>
    </div>
  );
};

export default CodeForcesProfile;
