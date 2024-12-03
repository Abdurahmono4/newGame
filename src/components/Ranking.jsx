import React from "react";

const Ranking = ({ rankings }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-green-600 animate-bounce">
        🎉 Tabriklaymiz! 🎉
      </h2>
      <p className="text-gray-700 mt-2">
        Quyida eng yaxshi o'yinchilar ro'yxati:
      </p>
      <ul className="w-full max-w-sm mt-4 space-y-2">
        {rankings.map((rank, index) => (
          <li
            key={index}
            className="flex justify-between px-4 py-2 bg-gray-100 border border-gray-300 rounded"
          >
            <span className="font-semibold">
              #{index + 1} {rank.name}
            </span>
            <span className="text-gray-600">Ball: {rank.score}</span>
          </li>
        ))}
      </ul>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        onClick={() => window.location.reload()}
      >
        Yana o'ynash
      </button>
    </div>
  );
};

export default Ranking;
