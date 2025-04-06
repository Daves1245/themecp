import React from 'react';

const AttentionBox = () => {
  return (
    <div className="border border-gray-200 rounded overflow-hidden">
      <h3 className="bg-gray-100 m-0 px-4 py-2 text-sm font-medium border-b border-gray-200">→ Pay attention</h3>
      <div className="p-4">
        <p className="text-center m-0">
          Before contest<br />
          <a href="#" className="text-blue-600 font-bold">Codeforces Round 1014 (Div. 2)</a><br />
          <span className="font-bold">35:24:32</span>
        </p>
      </div>
    </div>
  );
};

export default AttentionBox;