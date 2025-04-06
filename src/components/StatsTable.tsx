import React from 'react';

// Define interfaces for the stats data
interface NumbersAboutStats {
  tried: number;
  solved: number;
  averageAttempts: number;
  maxAttempts: {
    value: number;
    problemId: string;
  };
  solvedWithOneSubmission: {
    value: number;
    percentage: number;
  };
  maxAC: {
    value: number;
    problemId: string;
  };
}

interface ContestsStats {
  numberOfContests: number;
  bestRank: {
    value: number;
    contestId: string;
  };
  worstRank: {
    value: number;
    contestId: string;
  };
  maxUp: {
    value: number;
    contestId: string;
  };
  maxDown: {
    value: number;
    contestId: string;
  };
}

interface StatsTableProps {
  username: string;
  numbersAbout: NumbersAboutStats;
  contests: ContestsStats;
}

// Table row component for consistent styling
const TableRow: React.FC<{
  label: string;
  value: React.ReactNode;
}> = ({ label, value }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderBottom: '1px solid #eee',
    }}>
      <div style={{
        color: '#666',
        fontWeight: 500
      }}>
        {label}
      </div>
      <div style={{
        fontWeight: 500
      }}>
        {value}
      </div>
    </div>
  );
};

// Component for a single stat table
const StatTable: React.FC<{
  title: string;
  username: string;
  children: React.ReactNode;
}> = ({ title, username, children }) => {
  return (
    <div style={{
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      width: '100%',
      marginBottom: '24px'
    }}>
      <div style={{
        backgroundColor: '#5CBFB9',
        color: '#333',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          fontWeight: 600,
          fontSize: '16px'
        }}>
          {title}
        </div>
        <div style={{
          fontWeight: 500,
          fontSize: '16px'
        }}>
          {username}
        </div>
      </div>
      {children}
    </div>
  );
};

// Link component with consistent styling
const ProblemLink: React.FC<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  return (
    <span>
      {children}
      {' '}
      <span style={{
        color: '#4a90e2',
        cursor: 'pointer'
      }}>
        ({id})
      </span>
    </span>
  );
};

const StatsTables: React.FC<StatsTableProps> = ({
  username,
  numbersAbout,
  contests
}) => {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      width: '100%',
      flexWrap: 'wrap',
      fontFamily: 'Arial, sans-serif',
    }}>
      {/* Numbers About Table */}
      <div style={{ flex: '1 1 400px' }}>
        <StatTable title="Some numbers about" username={username}>
          <TableRow
            label="Tried"
            value={numbersAbout.tried}
          />
          <TableRow
            label="Solved"
            value={numbersAbout.solved}
          />
          <TableRow
            label="Average attempts"
            value={numbersAbout.averageAttempts.toFixed(2)}
          />
          <TableRow
            label="Max attempts"
            value={
              <ProblemLink id={numbersAbout.maxAttempts.problemId}>
                {numbersAbout.maxAttempts.value}
              </ProblemLink>
            }
          />
          <TableRow
            label="Solved with one submission"
            value={`${numbersAbout.solvedWithOneSubmission.value} (${numbersAbout.solvedWithOneSubmission.percentage.toFixed(1)}%)`}
          />
          <TableRow
            label="Max AC(s)"
            value={
              <ProblemLink id={numbersAbout.maxAC.problemId}>
                {numbersAbout.maxAC.value}
              </ProblemLink>
            }
          />
        </StatTable>
      </div>

      {/* Contests Table */}
      <div style={{ flex: '1 1 400px' }}>
        <StatTable title="Contests of" username={username}>
          <TableRow
            label="Number of contests"
            value={contests.numberOfContests}
          />
          <TableRow
            label="Best rank"
            value={
              <ProblemLink id={contests.bestRank.contestId}>
                {contests.bestRank.value}
              </ProblemLink>
            }
          />
          <TableRow
            label="Worst rank"
            value={
              <ProblemLink id={contests.worstRank.contestId}>
                {contests.worstRank.value}
              </ProblemLink>
            }
          />
          <TableRow
            label="Max up"
            value={
              <ProblemLink id={contests.maxUp.contestId}>
                {contests.maxUp.value}
              </ProblemLink>
            }
          />
          <TableRow
            label="Max down"
            value={
              <ProblemLink id={contests.maxDown.contestId}>
                {contests.maxDown.value}
              </ProblemLink>
            }
          />
        </StatTable>
      </div>
    </div>
  );
};

// Demo component with sample data
const StatTablesDemo = () => {
  // Sample data matching the image
  const sampleData = {
    username: 'medbar',
    numbersAbout: {
      tried: 944,
      solved: 860,
      averageAttempts: 2.50,
      maxAttempts: {
        value: 25,
        problemId: '342-E'
      },
      solvedWithOneSubmission: {
        value: 543,
        percentage: 63.14
      },
      maxAC: {
        value: 3,
        problemId: '1557-A'
      }
    },
    contests: {
      numberOfContests: 99,
      bestRank: {
        value: 814,
        contestId: '2051'
      },
      worstRank: {
        value: 14918,
        contestId: '1833'
      },
      maxUp: {
        value: 416,
        contestId: '1542'
      },
      maxDown: {
        value: -125,
        contestId: '1833'
      }
    }
  };

  return <StatsTables
    username={sampleData.username}
    numbersAbout={sampleData.numbersAbout}
    contests={sampleData.contests}
  />;
};

export default StatTablesDemo;
