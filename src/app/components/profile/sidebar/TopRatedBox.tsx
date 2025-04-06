import React from 'react';

const TopRatedBox = () => {
  const topUsers = [
    { rank: 1, username: 'tourist', rating: 3892 },
    { rank: 2, username: 'jiangly', rating: 3797 },
    { rank: 3, username: 'orzdevinwang', rating: 3706 },
    { rank: 4, username: 'jqdai0815', rating: 3682 },
    { rank: 5, username: 'ksun48', rating: 3588 }
  ];

  return (
    <div className="border border-gray-200 rounded overflow-hidden mt-4">
      <h3 className="bg-gray-100 m-0 px-4 py-2 text-sm font-medium border-b border-gray-200">→ Top rated</h3>
      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-1 px-2 border-b border-gray-200">#</th>
              <th className="text-left py-1 px-2 border-b border-gray-200">User</th>
              <th className="text-right py-1 px-2 border-b border-gray-200">Rating</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map(user => (
              <tr key={user.rank}>
                <td className="py-1 px-2 border-b border-gray-100">{user.rank}</td>
                <td className="py-1 px-2 border-b border-gray-100">
                  <a
                    href="#"
                    className={`${user.rating > 3000 ? 'text-red-600 font-bold' : 'text-blue-600'}`}
                  >
                    {user.username}
                  </a>
                </td>
                <td className="py-1 px-2 border-b border-gray-100 text-right">{user.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopRatedBox;