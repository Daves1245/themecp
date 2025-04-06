import React from 'react';
import useStore from '@/types/store';
import { getProblemColor } from '@/utils/colors';

const UnsolvedProblemsComponent = () => {
  const filters = useStore(state => state.filters);

  if (filters.status !== 'success') {
    return <div>Loading...</div>;
  }

  // Get all unsolved problems with their ratings
  const unsolvedProblems = Array.from(filters.data.byStatus.unsolved).map(problemId => {
    // Find the rating for this problem by checking all rating buckets
    let rating: number | undefined;
    for (const [bucketRating, problems] of filters.data.byRating.entries()) {
      if (problems.has(problemId)) {
        rating = bucketRating;
        break;
      }
    }
    return { id: problemId, rating };
  });

  // Sort by rating (undefined ratings go last)
  const sortedProblems = unsolvedProblems.sort((a, b) => {
    if (a.rating === undefined) return 1;
    if (b.rating === undefined) return -1;
    return a.rating - b.rating;
  });

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Unsolved Problems</h2>

      <div className="mb-4">
        <span className="text-xl">Count : {sortedProblems.length}</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {sortedProblems.map((problem) => (
          <a
            key={problem.id}
            href={`#problem/${problem.id}`}
            style={{
              color: problem.rating ? getProblemColor(problem.rating) : '#666666'
            }}
            className="hover:underline"
          >
            {problem.id}
          </a>
        ))}
      </div>
    </div>
  );
};

export default UnsolvedProblemsComponent;
