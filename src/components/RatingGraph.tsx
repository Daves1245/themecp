"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getRatingRanges, getColorByRating } from '@/utils/colors';

// Define interfaces for type safety
interface Contest {
  id: number;
  name: string;
  date: Date;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingChange: number;
}

interface RatingRange {
  min: number;
  max: number;
  color: string;
  name: string;
}

// Define the rating ranges and their corresponding colors
const RATING_RANGES: RatingRange[] = [
  { min: 0, max: 1199, color: '#CCCCCC', name: 'Newbie' },
  { min: 1200, max: 1399, color: '#77FF77', name: 'Pupil' },
  { min: 1400, max: 1599, color: '#77DDBB', name: 'Specialist' },
  { min: 1600, max: 1899, color: '#AAAAFF', name: 'Expert' },
  { min: 1900, max: 2099, color: '#FF88FF', name: 'Candidate Master' },
  { min: 2100, max: 2399, color: '#FFBB55', name: 'Master' },
  { min: 2400, max: 2599, color: '#FFBB55', name: 'International Master' },
  { min: 2600, max: 2999, color: '#FF7777', name: 'Grandmaster' },
  { min: 3000, max: 3499, color: '#FF3333', name: 'International Grandmaster' },
  { min: 3500, max: Infinity, color: '#AA0000', name: 'Legendary Grandmaster' }
];

// Function to get color based on rating
const getRatingColor = (rating: number): string => {
  const range = RATING_RANGES.find(r => rating >= r.min && rating <= r.max);
  return range ? range.color : '#CCCCCC';
};

const RatingGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [sampleData, setSampleData] = useState<Contest[]>([]);

  // Generate sample data on component mount
  useEffect(() => {
    // Generate sample data that resembles the image
    const dataPoints: { date: Date; rating: number }[] = [
      { date: new Date(2021, 0, 15), rating: 600 },
      { date: new Date(2021, 1, 1), rating: 960 },
      { date: new Date(2021, 2, 1), rating: 1020 },
      { date: new Date(2021, 3, 1), rating: 950 },
      { date: new Date(2021, 4, 1), rating: 980 },
      { date: new Date(2021, 5, 1), rating: 950 },
      { date: new Date(2021, 6, 15), rating: 990 },
      { date: new Date(2021, 8, 1), rating: 1050 },
      { date: new Date(2021, 9, 1), rating: 1000 },
      { date: new Date(2021, 10, 1), rating: 1010 },
      { date: new Date(2021, 11, 1), rating: 1080 },
      { date: new Date(2022, 0, 1), rating: 1040 },
      { date: new Date(2022, 1, 1), rating: 1000 },
      { date: new Date(2022, 2, 1), rating: 970 },
      { date: new Date(2022, 3, 15), rating: 1020 },
      { date: new Date(2022, 5, 1), rating: 1100 },
      { date: new Date(2022, 6, 15), rating: 1050 },
      { date: new Date(2022, 7, 15), rating: 1000 },
      { date: new Date(2022, 9, 1), rating: 1030 },
      { date: new Date(2022, 11, 1), rating: 980 },
      { date: new Date(2023, 0, 15), rating: 1050 },
      { date: new Date(2023, 1, 15), rating: 1170 },
      { date: new Date(2023, 2, 15), rating: 1220 },
      { date: new Date(2023, 3, 1), rating: 1280 },
      { date: new Date(2023, 3, 15), rating: 1250 },
      { date: new Date(2023, 4, 1), rating: 1200 },
      { date: new Date(2023, 5, 1), rating: 1150 },
      { date: new Date(2023, 6, 1), rating: 1100 },
      { date: new Date(2023, 6, 15), rating: 1050 },
      { date: new Date(2023, 7, 1), rating: 1080 },
      { date: new Date(2023, 7, 15), rating: 1130 },
      { date: new Date(2023, 8, 1), rating: 1180 },
      { date: new Date(2023, 8, 15), rating: 1230 },
      { date: new Date(2023, 9, 1), rating: 1160 },
      { date: new Date(2023, 9, 15), rating: 1100 },
      { date: new Date(2023, 10, 1), rating: 1080 },
      { date: new Date(2023, 10, 15), rating: 1050 },
      { date: new Date(2023, 11, 1), rating: 1100 },
      { date: new Date(2023, 11, 15), rating: 1150 },
      { date: new Date(2024, 0, 1), rating: 1200 },
      { date: new Date(2024, 0, 15), rating: 1280 },
      { date: new Date(2024, 1, 1), rating: 1350 },
      { date: new Date(2024, 1, 15), rating: 1320 },
      { date: new Date(2024, 2, 1), rating: 1290 },
      { date: new Date(2024, 2, 15), rating: 1250 },
      { date: new Date(2024, 3, 1), rating: 1200 },
      { date: new Date(2024, 4, 1), rating: 1150 },
      { date: new Date(2024, 5, 1), rating: 1100 },
      { date: new Date(2024, 6, 1), rating: 1050 },
      { date: new Date(2024, 7, 1), rating: 1080 },
      { date: new Date(2024, 8, 1), rating: 1120 },
      { date: new Date(2024, 9, 1), rating: 1080 },
      { date: new Date(2024, 9, 15), rating: 1050 },
      { date: new Date(2024, 10, 1), rating: 1100 },
      { date: new Date(2024, 10, 15), rating: 1200 },
      { date: new Date(2024, 11, 1), rating: 1400 },
      { date: new Date(2024, 11, 15), rating: 1650 },
      { date: new Date(2025, 0, 15), rating: 2300 },
      { date: new Date(2025, 1, 1), rating: 3250 },
      { date: new Date(2025, 2, 1), rating: 3200 },
      { date: new Date(2025, 3, 1), rating: 1300 }
    ];

    // Convert to contest objects
    const data: Contest[] = dataPoints.map((point, index) => ({
      id: index + 1,
      name: `Codeforces Round #${800 + index}`,
      date: point.date,
      rank: Math.floor(Math.random() * 2000) + 100,
      oldRating: index === 0 ? 0 : dataPoints[index - 1].rating,
      newRating: point.rating,
      ratingChange: index === 0 ? point.rating : point.rating - dataPoints[index - 1].rating
    }));

    setSampleData(data);
  }, []);

  // Create the chart when data is available
  useEffect(() => {
    if (!sampleData.length || !svgRef.current) return;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Define dimensions
    const margin = { top: 20, right: 120, bottom: 50, left: 60 };
    const width = 1100 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(sampleData, d => d.date) as [Date, Date])
      .range([0, width]);

    // Get min and max ratings with padding
    const minRating = Math.min(...sampleData.map(d => d.newRating)) - 100;
    const maxRating = Math.max(...sampleData.map(d => d.newRating)) + 100;

    const yScale = d3.scaleLinear()
      .domain([Math.max(0, minRating), maxRating])
      .range([height, 0]);

    // Create line generator
    const line = d3.line<Contest>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.newRating));

    // Add rating bands
    RATING_RANGES.forEach(range => {
      // Only draw bands that are within our y-scale domain
      if (range.min <= yScale.domain()[1] && range.max >= yScale.domain()[0]) {
        const bandBottom = Math.max(range.min, yScale.domain()[0]);
        const bandTop = Math.min(range.max, yScale.domain()[1]);

        svg.append('rect')
          .attr('x', 0)
          .attr('y', yScale(bandTop))
          .attr('width', width)
          .attr('height', Math.max(0, yScale(bandBottom) - yScale(bandTop)))
          .attr('fill', range.color)
          .attr('opacity', 0.6);

        // Add text label for the range
        svg.append('text')
          .attr('x', width + 10)
          .attr('y', yScale((bandTop + bandBottom) / 2))
          .attr('dy', '0.35em')
          .attr('fill', range.color)
          .style('font-size', '12px')
          .style('font-weight', 'bold')
          .text(range.name);
      }
    });

    // Add x-axis grid lines - make them thinner
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(12)
          .tickSize(-height)
          .tickFormat('')
      )
      .selectAll('line')
      .style('stroke', 'var(--border-color)')
      .style('stroke-width', '0.5px');

    // Add y-axis grid lines only at rating boundaries
    const ratingTicks = RATING_RANGES.map(range => range.min).filter(val => val >= yScale.domain()[0] && val <= yScale.domain()[1]);
    
    svg.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(yScale)
          .tickValues(ratingTicks)
          .tickSize(-width)
          .tickFormat('')
      )
      .selectAll('line')
      .style('stroke', 'var(--border-color)')
      .style('stroke-width', '0.5px');

    // Add the line path
    svg.append('path')
      .datum(sampleData)
      .attr('fill', 'none')
      .attr('stroke', 'var(--link-color)')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add points
    svg.selectAll('.data-point')
      .data(sampleData)
      .join('circle')
      .attr('class', 'data-point')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.newRating))
      .attr('r', 5)
      .attr('fill', d => getColorByRating(d.newRating))
      .attr('stroke', 'var(--foreground)')
      .attr('stroke-width', 1.5)
      .on('mouseover', function(event: MouseEvent, d: Contest) {
        d3.select(this)
          .attr('r', 7)
          .attr('stroke-width', 2);

        setSelectedContest(d);

        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 15}px`)
          .style('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('r', 5)
          .attr('stroke-width', 1.5);

        d3.select(tooltipRef.current)
          .style('opacity', 0);

        setSelectedContest(null);
      });

    // Add axes with styled text
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b %Y')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('fill', 'var(--text-muted)')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-35)');

    svg.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('fill', 'var(--text-muted)');

    // Add axis labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 5)
      .attr('text-anchor', 'middle')
      .style('fill', 'var(--text-muted)')
      .text('Date');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15)
      .attr('text-anchor', 'middle')
      .style('fill', 'var(--text-muted)')
      .text('Rating');

  }, [sampleData]);

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-[1400px] mx-auto">
      <div className="relative w-full">
        <svg ref={svgRef} className="w-full"></svg>

        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className="absolute bg-[var(--card-bg)] text-[var(--foreground)] p-2 rounded-md shadow-lg pointer-events-none opacity-0 transition-opacity duration-200 z-10"
          style={{ maxWidth: '200px' }}
        >
          {selectedContest && (
            <>
              <div className="font-bold mb-1">{selectedContest.name}</div>
              <div>Date: {selectedContest.date.toLocaleDateString()}</div>
              <div>Rank: {selectedContest.rank}</div>
              <div className="flex items-center">
                Rating Change:
                <span className={`ml-1 font-bold ${selectedContest.ratingChange >= 0 ? 'text-[var(--rank-pupil)]' : 'text-[var(--rank-grandmaster)]'}`}>
                  {selectedContest.ratingChange >= 0 ? '+' : ''}{selectedContest.ratingChange}
                </span>
              </div>
              <div>New Rating: {selectedContest.newRating}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingGraph;
