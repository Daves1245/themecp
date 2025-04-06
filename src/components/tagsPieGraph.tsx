import React, { useState, useEffect } from 'react';

// Define the Problem interface
interface Problem {
  id: string | number;
  type: string;
  solved: boolean;
}

// Define props for the PieChart component
interface PieChartProps {
  problems: Problem[];
  solvedStatus: boolean;
}

// Define the type count interface
interface TypeCount {
  type: string;
  count: number;
  color: string;
}

// Colors for the pie chart segments
const COLORS = [
  '#f4979c', // implementation (salmon)
  '#f49bc7', // greedy (pink)
  '#d49bf4', // math (light purple)
  '#9c9bf4', // brute force (lavender)
  '#9bbff4', // constructive algorithms (light blue)
  '#9be1f4', // sortings (light cyan)
  '#9bf4e6', // strings (aqua)
  '#9bf4c6', // number theory (mint)
  '#66cdaa', // dp (medium aquamarine)
  '#9df49b', // binary search (light green)
  '#cdf49b', // data structures (lime green)
  '#f4f19b', // two pointers (light yellow)
  '#f4e69b', // bitmasks (pale yellow)
  '#f4d89b', // combinatorics (light orange)
  '#f4c09b', // games (peach)
  '#f4a89b', // geometry (coral)
  '#f49b9b', // graphs (light red)
  '#f49bc3', // dfs and similar (pink)
  '#e09bf4', // dsu (light purple)
];

const PieChart: React.FC<PieChartProps> = ({ problems, solvedStatus }) => {
  const [typeCounts, setTypeCounts] = React.useState<TypeCount[]>([]);
  const [total, setTotal] = React.useState<number>(0);

  useEffect(() => {
    // Filter problems by solved status
    const filteredProblems = problems.filter(problem => problem.solved === solvedStatus);

    // Count occurrences of each type
    const counts: Record<string, number> = {};
    filteredProblems.forEach((problem) => {
      counts[problem.type] = (counts[problem.type] || 0) + 1;
    });

    // Convert to array and sort by count (descending)
    const typeCountArray = Object.entries(counts).map(([type, count], index) => ({
      type,
      count,
      color: COLORS[index % COLORS.length]
    }));

    typeCountArray.sort((a, b) => b.count - a.count);

    setTypeCounts(typeCountArray);
    setTotal(filteredProblems.length);
  }, [problems, solvedStatus]);

  // Calculate the paths for the pie chart
  const calculatePiePaths = () => {
    const paths = [];
    let currentAngle = 0;

    for (const typeCount of typeCounts) {
      const percentage = typeCount.count / total;
      const angle = percentage * 360;

      // Calculate the start and end coordinates
      const startX = Math.cos((currentAngle - 90) * (Math.PI / 180)) * 150 + 200;
      const startY = Math.sin((currentAngle - 90) * (Math.PI / 180)) * 150 + 200;
      const endX = Math.cos((currentAngle + angle - 90) * (Math.PI / 180)) * 150 + 200;
      const endY = Math.sin((currentAngle + angle - 90) * (Math.PI / 180)) * 150 + 200;

      // Determine if the arc should be drawn as a large arc (> 180 degrees)
      const largeArcFlag = angle > 180 ? 1 : 0;

      // Create the SVG path
      const path = `
        M 200 200
        L ${startX} ${startY}
        A 150 150 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
      `;

      paths.push({ path, color: typeCount.color });
      currentAngle += angle;
    }

    return paths;
  };

  // Calculate the legend items and their positions
  const renderLegend = () => {
    return typeCounts.map((item) => (
      <div key={item.type} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <div
          style={{
            width: '16px',
            height: '16px',
            backgroundColor: item.color,
            marginRight: '8px'
          }}
        />
        <span>
          {item.type} : {item.count}
        </span>
      </div>
    ));
  };

  const piePaths = calculatePiePaths();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{ flex: '0 0 60%' }}>
        <h2 style={{ marginBottom: '20px' }}>
          {solvedStatus ? 'Tags Solved' : 'Tags Unsolved'}
        </h2>
        {total > 0 ? (
          <svg width="400" height="400" viewBox="0 0 400 400">
            {/* Draw pie segments */}
            {piePaths.map((item, index) => (
              <path
                key={index}
                d={item.path}
                fill={item.color}
                stroke="white"
                strokeWidth="1"
              />
            ))}

            {/* White circle in the middle for the donut effect */}
            <circle cx="200" cy="200" r="100" fill="white" />
          </svg>
        ) : (
          <div style={{
            width: '400px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#666'
          }}>
            No {solvedStatus ? 'solved' : 'unsolved'} problems found
          </div>
        )}
      </div>
      <div style={{
        flex: '0 0 40%',
        maxHeight: '400px',
        overflowY: 'auto',
        paddingLeft: '20px',
        paddingTop: '40px'
      }}>
        {renderLegend()}
      </div>
    </div>
  );
};

// Tab component for Solved/Unsolved selection
interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontWeight: active ? 'bold' : 'normal',
        cursor: 'pointer',
        borderBottom: active ? '3px solid #4a90e2' : '3px solid transparent',
        transition: 'all 0.3s ease',
        fontSize: '16px'
      }}
    >
      {label}
    </div>
  );
};

// Generate sample data to match the image
const generateSampleProblems = (): Problem[] => {
  const solvedTypeCountMap = {
    'implementation': 343,
    'greedy': 342,
    'math': 316,
    'brute force': 165,
    'constructive algorithms': 157,
    'sortings': 109,
    'strings': 100,
    'number theory': 71,
    'dp': 69,
    'binary search': 67,
    'data structures': 44,
    'two pointers': 42,
    'bitmasks': 42,
    'combinatorics': 27,
    'games': 19,
    'geometry': 18,
    'graphs': 18,
    'dfs and similar': 17,
    'dsu': 10
  };

  // Different distribution for unsolved problems
  const unsolvedTypeCountMap = {
    'dp': 121,
    'math': 98,
    'graphs': 87,
    'implementation': 76,
    'greedy': 62,
    'dfs and similar': 58,
    'binary search': 45,
    'number theory': 42,
    'combinatorics': 40,
    'constructive algorithms': 37,
    'data structures': 34,
    'strings': 29,
    'bitmasks': 25,
    'brute force': 19,
    'sortings': 15,
    'geometry': 13,
    'two pointers': 10,
    'games': 8,
    'dsu': 7
  };

  const problems: Problem[] = [];
  let id = 1;

  // Add solved problems
  for (const [type, count] of Object.entries(solvedTypeCountMap)) {
    for (let i = 0; i < count; i++) {
      problems.push({
        id: id++,
        type,
        solved: true
      });
    }
  }

  // Add unsolved problems
  for (const [type, count] of Object.entries(unsolvedTypeCountMap)) {
    for (let i = 0; i < count; i++) {
      problems.push({
        id: id++,
        type,
        solved: false
      });
    }
  }

  return problems;
};

const ProblemTypesPieChart = () => {
  const [activeTab, setActiveTab] = useState<'solved' | 'unsolved'>('solved');
  const sampleProblems = generateSampleProblems();

  return (
    <div className="w-full h-full">
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <Tab
          label="Solved"
          active={activeTab === 'solved'}
          onClick={() => setActiveTab('solved')}
        />
        <Tab
          label="Unsolved"
          active={activeTab === 'unsolved'}
          onClick={() => setActiveTab('unsolved')}
        />
      </div>

      <PieChart
        problems={sampleProblems}
        solvedStatus={activeTab === 'solved'}
      />
    </div>
  );
};

export default ProblemTypesPieChart;
