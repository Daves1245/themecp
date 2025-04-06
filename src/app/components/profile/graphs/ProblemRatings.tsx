import React, { useState, useEffect } from 'react';
import useStore from '@/types/store';
import { getRatingCounts } from '@/types/filters/problemFilters';

const ProblemRatingsGraph = () => {
  const filters = useStore(state => state.filters);
  const [activeTab, setActiveTab] = useState<'solved' | 'unsolved'>('solved');

  // Get real data from filters
  const getRatingData = () => {
    if (filters.status !== 'success') return {};
    
    // Debug log the filter state
    console.log('Filter state:', {
      solvedCount: filters.data.byStatus.solved.size,
      unsolvedCount: filters.data.byStatus.unsolved.size,
      ratingBucketsCount: filters.data.byRating.size,
      ratingBuckets: Array.from(filters.data.byRating.entries()).map(([rating, problems]) => ({
        rating,
        totalCount: problems.size,
        solvedCount: Array.from(problems).filter(id => filters.data.byStatus.solved.has(id)).length,
        unsolvedCount: Array.from(problems).filter(id => filters.data.byStatus.unsolved.has(id)).length,
      }))
    });

    const data = getRatingCounts(filters.data, activeTab === 'solved');
    
    // Debug log the processed data
    console.log('Rating counts:', {
      activeTab,
      data,
      dataEntries: Object.entries(data).map(([rating, count]) => ({ rating, count }))
    });

    return data;
  };

  const data = getRatingData();

  // Find the maximum value for scaling
  const maxCount = Math.max(...Object.values(data));

  // Determine the best increment based on maxCount
  const determineIncrement = (max: number) => {
    if (max <= 20) return 5;
    if (max <= 50) return 10;
    if (max <= 100) return 25;
    if (max <= 500) return 50;
    return 100;
  };

  const increment = determineIncrement(maxCount);
  // Round up maxCount to next increment
  const yAxisMax = Math.ceil(maxCount / increment) * increment;

  // Calculate height and width
  const graphHeight = 400;
  const graphWidth = 800;
  const barWidth = 40;
  const barSpacing = 15;
  const leftPadding = 60; // For y-axis
  const bottomPadding = 50; // For x-axis

  // Generate color for a bar based on problem rating
  const getBarColor = (rating: number) => {
    if (rating < 1200) return '#d9d9d9'; // Gray for newbie
    if (rating < 1400) return '#77ff77'; // Green for pupil
    if (rating < 1600) return '#77ddbb'; // Cyan for specialist
    if (rating < 1900) return '#aaaaff'; // Blue for expert
    if (rating < 2100) return '#ff88ff'; // Purple for candidate master
    if (rating < 2400) return '#ffbb55'; // Orange for master
    return '#ff7777'; // Red for higher ratings
  };

  // Generate y-axis ticks using the determined increment
  const yAxisTicks = Array.from(
    { length: Math.floor(yAxisMax / increment) + 1 },
    (_, i) => i * increment
  );

  if (filters.status !== 'success') {
    return <div>Loading...</div>;
  }

  // Sort ratings for consistent display
  const sortedData = Object.entries(data)
    .sort(([a], [b]) => parseInt(a) - parseInt(b));

  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Problem Ratings</h2>

      <div className="flex items-center justify-center mb-4">
        <div className="flex border-b">
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab === 'solved' ? 'border-b-2 border-blue-500 font-bold' : ''
            }`}
            onClick={() => setActiveTab('solved')}
          >
            Solved ({filters.data.byStatus.solved.size})
          </div>
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab === 'unsolved' ? 'border-b-2 border-blue-500 font-bold' : ''
            }`}
            onClick={() => setActiveTab('unsolved')}
          >
            Unsolved ({filters.data.byStatus.unsolved.size})
          </div>
        </div>
      </div>

      <div className="relative" style={{ height: `${graphHeight}px`, width: '100%' }}>
        {/* Y-axis */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between pb-10">
          {yAxisTicks.map((tick, i) => (
            <div key={i} className="flex items-center">
              <span className="mr-2 text-sm text-gray-600 w-10 text-right">{tick}</span>
              <div
                className="absolute border-t border-gray-200"
                style={{
                  width: `calc(100% - 60px)`,
                  left: '60px',
                  top: `${graphHeight - (tick / yAxisMax) * (graphHeight - bottomPadding)}px`
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* X-axis and bars */}
        <div className="absolute left-0 top-0 w-full h-full ml-12">
          <svg width="100%" height="100%" className="overflow-visible">
            {/* Bars */}
            {sortedData.map(([rating, count], index) => {
              const barHeight = (count / yAxisMax) * (graphHeight - bottomPadding);
              const xPosition = leftPadding + index * (barWidth + barSpacing);
              const yPosition = graphHeight - barHeight - bottomPadding/2;

              return (
                <g key={rating}>
                  <rect
                    x={xPosition}
                    y={yPosition}
                    width={barWidth}
                    height={barHeight}
                    fill={getBarColor(parseInt(rating))}
                    stroke="#ccc"
                    strokeWidth="1"
                  />
                  <text
                    x={xPosition + barWidth/2}
                    y={graphHeight - 10}
                    textAnchor="middle"
                    className="text-sm"
                    fill="#333"
                  >
                    {rating}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProblemRatingsGraph;
