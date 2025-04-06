"use client";

import React from 'react';

interface FrequencyMap {
  [rating: string]: number;
}

interface ProblemRatingsGraphProps {
  frequencyMap?: FrequencyMap;
}

const ProblemRatingsGraph: React.FC<ProblemRatingsGraphProps> = ({ frequencyMap }) => {
  // If no data is provided, use sample data
  const sampleData: FrequencyMap = {
    '800': 320,
    '900': 88,
    '1000': 82,
    '1100': 86,
    '1200': 74,
    '1300': 48,
    '1400': 49,
    '1500': 16,
    '1600': 8,
    '1700': 7,
    '1800': 12,
    '1900': 2,
    '2400': 2
  };

  const data = frequencyMap || sampleData;

  // Find the maximum value for scaling
  const maxCount = Math.max(...Object.values(data));
  // Add 10% padding to the top
  const yAxisMax = Math.ceil(maxCount * 1.1 / 50) * 50;

  // Calculate height and width
  const graphHeight = 400;
  const graphWidth = 800;
  const barWidth = 40;
  const barSpacing = 15;
  const leftPadding = 60; // For y-axis
  const bottomPadding = 50; // For x-axis

  // Generate color for a bar based on problem rating
  const getBarColor = (rating: string): string => {
    const ratingNum = parseInt(rating);
    if (ratingNum < 1200) return '#d9d9d9'; // Gray for newbie
    if (ratingNum < 1400) return '#77ff77'; // Green for pupil
    if (ratingNum < 1600) return '#77ddbb'; // Cyan for specialist
    if (ratingNum < 1900) return '#aaaaff'; // Blue for expert
    if (ratingNum < 2100) return '#ff88ff'; // Purple for candidate master
    if (ratingNum < 2400) return '#ffbb55'; // Orange for master
    return '#ff7777'; // Red for higher ratings
  };

  // Generate y-axis ticks
  const yAxisTicks: number[] = [];
  const numYTicks = 7;
  for (let i = 0; i <= numYTicks; i++) {
    yAxisTicks.push(Math.round(i * yAxisMax / numYTicks));
  }
  yAxisTicks.reverse();

  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Problem Ratings</h2>

      <div className="flex items-center justify-center mb-2">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 mr-2"></div>
          <span>Problems Solved</span>
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
            {/* Grid lines are handled by the div elements above */}

            {/* Bars */}
            {Object.entries(data).map(([rating, count], index) => {
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
                    fill={getBarColor(rating)}
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
