import React, { useState } from "react";

const Question = ({ question, onAnswer }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6">
      <h2 className="text-3xl font-semibold mb-8 animate__animated animate__zoomIn">
        {question.question}
      </h2>
      <div className="space-y-4 w-full sm:w-80">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer === question.correctAnswer)}
            className="w-full p-4 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-lg text-xl hover:bg-gradient-to-l hover:scale-105 transition-all duration-300"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
