import React, { useState } from "react";

const StartScreen = ({ onStart }) => {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name) {
      onStart(name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-extrabold mb-4">Quiz Game</h1>
      <input
        type="text"
        placeholder="Ismingizni kiriting"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 rounded-md w-80 text-black mb-6"
      />
      <button
        onClick={handleStart}
        className="p-4 bg-yellow-400 text-black rounded-lg text-xl hover:bg-yellow-500 transition-all duration-300"
      >
        O'yinni boshlash
      </button>
    </div>
  );
};

export default StartScreen;
