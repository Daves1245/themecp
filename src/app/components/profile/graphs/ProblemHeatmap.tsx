"use client";

import React, { useState, useMemo } from 'react';
import useStore from '@/types/store';

const ProblemHeatmap = () => {
  const filters = useStore(state => state.filters);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Define rating categories with their colors
  const ratingColors = {
    empty: '#e0e0e0',       // Light gray
    newbie: '#a0a0a0',      // Dark gray
    pupil: '#77DD77',       // Green
    specialist: '#76DDEC',  // Cyan
    expert: '#7777FF',      // Dark blue
    candidateMaster: '#FF77FF', // Purple
    master: '#FFBB55'       // Light orange
  };

  // Define the days and months
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getRatingColor = (rating: number): string => {
    if (rating === 0) return ratingColors.empty;
    if (rating < 1200) return ratingColors.newbie;
    if (rating < 1400) return ratingColors.pupil;
    if (rating < 1600) return ratingColors.specialist;
    if (rating < 1900) return ratingColors.expert;
    if (rating < 2100) return ratingColors.candidateMaster;
    return ratingColors.master;
  };

  // Memoize the heatmap data generation
  const generateHeatmapData = useMemo(() => {
    console.time('heatmap-generation');
    
    // Return empty data if filters aren't loaded yet or if there's no data
    if (filters.status !== 'success' || !filters.data?.byDate) {
      return Array(7).fill(null).map(() => Array(52).fill(0));
    }

    const data = Array(7).fill(null).map(() => Array(52).fill(0));
    const yearStart = new Date(selectedYear, 0, 1);
    
    // Filter and process dates for selected year
    Object.entries(filters.data.byDate)
      .filter(([date]) => date.startsWith(selectedYear.toString()))
      .forEach(([date, dayData]) => {
        const [year, month, day] = date.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        const dayOfWeek = dateObj.getDay();
        const weekNumber = Math.floor(
          (dateObj.getTime() - yearStart.getTime()) / 
          (7 * 24 * 60 * 60 * 1000)
        );
        
        if (weekNumber >= 0 && weekNumber < 52 && dayOfWeek >= 0 && dayOfWeek < 7) {
          data[dayOfWeek][weekNumber] = dayData.maxRating;
        }
      });

    console.timeEnd('heatmap-generation');
    return data;
  }, [filters.status, filters.data?.byDate, selectedYear]);

  // Generate year options (current year and 2 years back)
  const yearOptions = useMemo(() => 
    Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i),
    []
  );

  // Enhanced tooltip content
  const getTooltipContent = (rating: number, date: string) => {
    if (rating === 0) return 'No problems solved';
    const problems = filters.data?.byDate[date]?.problems.size ?? 0;
    return `Rating: ${rating}\nProblems solved: ${problems}`;
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden mt-6 mb-6">
      <h3 className="bg-gray-100 m-0 px-4 py-2 text-sm font-medium border-b border-gray-200 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-700">Rating-Based Heatmap</span>
        <div className="flex items-center">
          <span className="mr-2">problem-solving heatmap</span>
          <select 
            className="border border-gray-300 rounded px-2 py-1"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </h3>
      <div className="p-2">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-16"></th>
                {months.map((month, index) => (
                  <th key={index} className="text-center px-1 font-medium" colSpan="4">
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex}>
                  <td className="text-right pr-2 py-0 font-medium">{day}</td>
                  {generateHeatmapData[dayIndex].map((rating, cellIndex) => {
                    const date = new Date(selectedYear, 0, 1);
                    date.setDate(date.getDate() + cellIndex * 7 + dayIndex);
                    const dateString = date.toISOString().split('T')[0];
                    
                    return (
                      <td
                        key={cellIndex}
                        className="p-0"
                      >
                        <div
                          className="w-4 h-4"
                          style={{ backgroundColor: getRatingColor(rating) }}
                          title={getTooltipContent(rating, dateString)}
                        ></div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProblemHeatmap;
