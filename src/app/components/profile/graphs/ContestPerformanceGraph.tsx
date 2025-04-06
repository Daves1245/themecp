import React from 'react';

const ContestPerformanceGraph = () => {
  const performanceData = [
    { contest: 'Round 920', rating: 1313, rank: 5421, performance: 1287 },
    { contest: 'Round 919', rating: 1287, rank: 4998, performance: 1324 },
    { contest: 'Round 918', rating: 1256, rank: 6123, performance: 1145 },
    { contest: 'Round 917', rating: 1324, rank: 5789, performance: 1187 },
    { contest: 'Round 916', rating: 1287, rank: 5234, performance: 1154 },
  ];

  return (
    <div className="border border-gray-200 rounded overflow-hidden mt-6">
      <h3 className="bg-gray-100 m-0 px-4 py-2 text-sm font-medium border-b border-gray-200">
        Contest Performance
      </h3>
      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b border-gray-200">Contest</th>
              <th className="text-right py-2 px-4 border-b border-gray-200">Rank</th>
              <th className="text-right py-2 px-4 border-b border-gray-200">Rating</th>
              <th className="text-right py-2 px-4 border-b border-gray-200">Performance</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((contest, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-100">
                  <a href="#" className="text-blue-600">{contest.contest}</a>
                </td>
                <td className="text-right py-2 px-4 border-b border-gray-100">{contest.rank}</td>
                <td className="text-right py-2 px-4 border-b border-gray-100">{contest.rating}</td>
                <td className="text-right py-2 px-4 border-b border-gray-100">{contest.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestPerformanceGraph;
