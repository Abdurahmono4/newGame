import React, { useState } from "react";

const Leaderboard = ({ rankings }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLeaderboard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle button */}
      <button
        className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-800"
        onClick={toggleLeaderboard}
        aria-label="Toggle Leaderboard"
      >
        🏆
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-80 h-full shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
              <h2 className="text-lg font-bold">Leaderboard</h2>
              <button
                className="text-xl font-bold hover:text-gray-300"
                onClick={toggleLeaderboard}
              >
                &times;
              </button>
            </div>
            <ul className="p-4 space-y-4">
              {rankings.map((rank, index) => (
                <li
                  key={index}
                  className="bg-blue-100 p-4 rounded-lg shadow-md"
                >
                  <p className="font-bold text-blue-600">
                    {index + 1}. {rank.name}
                  </p>
                  <p className="text-gray-600">Score: {rank.score}</p>
                  <p className="text-gray-500 text-sm">Time: {rank.time}s</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
