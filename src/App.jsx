import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Ranking from "./components/Ranking";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [showRanking, setShowRanking] = useState(false);
  const [rankings, setRankings] = useState(
    JSON.parse(localStorage.getItem("rankings")) || []
  );
  const [playerName, setPlayerName] = useState("");
  const questions = [
    {
      question: "C++: `int main() { return 0; }` kodining ma'nosi nima?",
      answers: [
        "Dastur to'liq ishladi.",
        "Dastur hech qanday ish bajarmadi.",
        "Dastur xatolik bilan tugadi.",
        "Dastur vaqtinchalik to'xtatildi.",
      ],
      correctAnswer: "Dastur to'liq ishladi.",
    },
    {
      question: "C++: `if` operatori qanday ishlaydi? Misol keltiring.",
      answers: [
        "Shart bajarilganda ma'lum bir kodni bajaradi.",
        "Har doim ma'lum bir kodni bajaradi.",
        "Shart bajarilmaganda kodni bajaradi.",
        "Barcha holatlarda kodni bajaradi.",
      ],
      correctAnswer: "Shart bajarilganda ma'lum bir kodni bajaradi.",
    },
    {
      question:
        "SQL: SQLda `SELECT` va `DISTINCT` operatorlari o'rtasidagi farq nima?",
      answers: [
        "`SELECT` barcha natijalarni ko'rsatadi, `DISTINCT` esa takrorlanuvchi qiymatlarni olib tashlaydi.",
        "`SELECT` faqat bitta natijani ko'rsatadi, `DISTINCT` esa barcha natijalarni ko'rsatadi.",
        "`SELECT` faqat olmoshlar (fields)ni ko'rsatadi, `DISTINCT` esa faqat jadvalni ko'rsatadi.",
        "`SELECT` ma'lumotlarni qo'shadi, `DISTINCT` esa o'chiradi.",
      ],
      correctAnswer:
        "`SELECT` barcha natijalarni ko'rsatadi, `DISTINCT` esa takrorlanuvchi qiymatlarni olib tashlaydi.",
    },
    {
      question: "C++: `new` operatori nima uchun ishlatiladi?",
      answers: [
        "Yangi obyekt yaratish.",
        "Yangi o'zgaruvchi yaratish.",
        "Yangi klass yaratish.",
        "Yangi pointer yaratish.",
      ],
      correctAnswer: "Yangi obyekt yaratish.",
    },
    {
      question:
        "C++: `private`, `protected`, va `public` o'rtasidagi farq nima?",
      answers: [
        "public: Har kim kirishi mumkin. private: Faqatgina o'z klassi ichidan foydalaniladi. protected: O'z klassidan va o'z klassidan meros olgan klasslardan foydalanish mumkin.",
        "public: Faqatgina o'z klassi ichidan foydalaniladi. private: Har kim kirishi mumkin. protected: Faqatgina meros olish orqali foydalaniladi.",
        "public: O'z klassidan foydalanish mumkin. private: Har kim kirishi mumkin. protected: Boshqa sinflardan foydalanish mumkin.",
        "public: O'zgaruvchilarni faqatgina o'z klassi orqali kirish mumkin. private: Har kim kirishi mumkin. protected: Boshqa sinflardan foydalanish mumkin.",
      ],
      correctAnswer:
        "public: Har kim kirishi mumkin. private: Faqatgina o'z klassi ichidan foydalaniladi. protected: O'z klassidan va o'z klassidan meros olgan klasslardan foydalanish mumkin.",
    },
    {
      question: "SQL: SQLda `JOIN` operatori nima? Misol bilan tushuntiring.",
      answers: [
        "Ma'lumotlarni ikki yoki undan ko'p jadvaldan birlashtirish.",
        "Yangi jadval yaratish.",
        "Jadvaldagi faqat birinchi qatorni olish.",
        "Jadvaldagi faqat bitta ustunni olish.",
      ],
      correctAnswer:
        "Ma'lumotlarni ikki yoki undan ko'p jadvaldan birlashtirish.",
    },
    {
      question: "C++: `for` tsikli qanday ishlaydi? Misol keltiring.",
      answers: [
        "Har safar shart tekshiriladi va agar to'g'ri bo'lsa, kod bajariladi.",
        "Shart bajarilganda kodni faqat bir marta bajaradi.",
        "Har safar kod bajariladi va shart tekshirilmaydi.",
        "Kod faqat bir marta bajariladi.",
      ],
      correctAnswer:
        "Har safar shart tekshiriladi va agar to'g'ri bo'lsa, kod bajariladi.",
    },
    {
      question: "C++: Constructor va Destructorlar o'rtasidagi farq nima?",
      answers: [
        "Constructor obyekt yaratilganda chaqiriladi, Destructor esa obyekt o'chirilganda chaqiriladi.",
        "Constructor faqat ob'ektni saqlaydi, Destructor esa uni o'zgartiradi.",
        "Constructor sinfning umumiy metodlarini ishlatadi, Destructor esa faqat qatorlarni o'zgartiradi.",
        "Constructor faqat bir marta chaqiriladi, Destructor esa har doim chaqiriladi.",
      ],
      correctAnswer:
        "Constructor obyekt yaratilganda chaqiriladi, Destructor esa obyekt o'chirilganda chaqiriladi.",
    },
    {
      question:
        "SQL: SQLda `GROUP BY` operatori nima va u qanday ishlaydi? Misol keltiring.",
      answers: [
        "Ma'lumotlarni guruhlash va yig'indilarni hisoblash.",
        "Ma'lumotlarni o'chirish.",
        "Ma'lumotlarni qo'shish.",
        "Ma'lumotlarni yangilash.",
      ],
      correctAnswer: "Ma'lumotlarni guruhlash va yig'indilarni hisoblash.",
    },
    {
      question: "C++: `const` kalit so'zi nima uchun ishlatiladi?",
      answers: [
        "O'zgaruvchining qiymatini o'zgartirish mumkin emas.",
        "Jadvalni o'zgartirish.",
        "Kodning maksimal tezligini oshirish.",
        "Xatoliklarni aniqlash.",
      ],
      correctAnswer: "O'zgaruvchining qiymatini o'zgartirish mumkin emas.",
    },
    {
      question: "C++: `nullptr` ning ma'nosi nima va u qanday ishlatiladi?",
      answers: [
        "Pointer qiymati bo'lmagan joyga murojaat qilish uchun ishlatiladi.",
        "Yangi pointer yaratish uchun ishlatiladi.",
        "Pointer qiymatni ko'rsatish uchun ishlatiladi.",
        "Pointerga qiymat qo'shish uchun ishlatiladi.",
      ],
      correctAnswer:
        "Pointer qiymati bo'lmagan joyga murojaat qilish uchun ishlatiladi.",
    },
    {
      question:
        "SQL: SQLda `WHERE` operatori qanday ishlaydi? Misol keltiring.",
      answers: [
        "Ma'lumotlarni belgilangan shartlar asosida tanlaydi.",
        "Ma'lumotlarni guruhlash.",
        "Yangi ma'lumotlarni qo'shish.",
        "Ma'lumotlarni olib tashlash.",
      ],
      correctAnswer: "Ma'lumotlarni belgilangan shartlar asosida tanlaydi.",
    },
    {
      question: "C++: `operator overloading` nima va qanday ishlatiladi?",
      answers: [
        "Operatorni o'zgaruvchilarga moslashtirish.",
        "Sinf ichida yangi metod yaratish.",
        "Operatorni yangi xususiyatlar bilan o'zgartirish.",
        "Pointerni operator sifatida ishlatish.",
      ],
      correctAnswer: "Operatorni o'zgaruvchilarga moslashtirish.",
    },
    {
      question: "C++: `virtual` kalit so'zi qanday ishlatiladi?",
      answers: [
        "Meros orqali metodni o'zgartirish.",
        "Maxfiy ma'lumotlarni saqlash.",
        "Sinflar orasida bog'lanishni ta'minlash.",
        "Yangi obyektlar yaratish.",
      ],
      correctAnswer: "Meros orqali metodni o'zgartirish.",
    },
    {
      question: "SQL: SQLda `INSERT INTO` operatori nima? Misol keltiring.",
      answers: [
        "Jadvalga yangi ma'lumotlarni qo'shish.",
        "Jadvaldagi ma'lumotlarni yangilash.",
        "Jadvaldagi ma'lumotlarni o'chirish.",
        "Jadvalni yaratish.",
      ],
      correctAnswer: "Jadvalga yangi ma'lumotlarni qo'shish.",
    },
    {
      question: "C++: `reference` va `pointer` o'rtasidagi farq nima?",
      answers: [
        "Reference qiymatni to'g'ridan-to'g'ri ko'rsatadi, pointer esa ma'lumotlar joyini ko'rsatadi.",
        "Reference faqat ob'ektlarga, pointer esa faqat funksiyalarga tegishli.",
        "Reference ma'lumotni saqlaydi, pointer esa faqat uzatadi.",
        "Pointer qiymatni saqlaydi, reference esa saqlamaydi.",
      ],
      correctAnswer:
        "Reference qiymatni to'g'ridan-to'g'ri ko'rsatadi, pointer esa ma'lumotlar joyini ko'rsatadi.",
    },
    {
      question: "C++: `static` kalit so'zi nima uchun ishlatiladi?",
      answers: [
        "Funksiya yoki o'zgaruvchi qiymatini o'zgartirishga cheklov qo'yadi.",
        "Sinflar orasidagi bog'lanishni ta'minlash.",
        "Jadvaldagi ma'lumotlarni o'zgartirish.",
        "Yangi ob'ekt yaratish.",
      ],
      correctAnswer:
        "Funksiya yoki o'zgaruvchi qiymatini o'zgartirishga cheklov qo'yadi.",
    },
    {
      question: "SQL: SQLda `ALTER TABLE` operatori nima uchun ishlatiladi?",
      answers: [
        "Jadval strukturasi o'zgartiriladi.",
        "Jadvalga yangi ma'lumotlar qo'shiladi.",
        "Jadvaldagi ma'lumotlar o'chiriladi.",
        "Jadval nomi o'zgartiriladi.",
      ],
      correctAnswer: "Jadval strukturasi o'zgartiriladi.",
    },
    {
      question: "C++: `friend` funksiyasining ma'nosi nima?",
      answers: [
        "Ushbu funksiya klassning ichki a'zolariga kirish huquqiga ega.",
        "Bu funksiya faqat o'zgaruvchilarni chiqaradi.",
        "Bu funksiya faqat metodlarni chaqiradi.",
        "Ushbu funksiya ma'lumotlarni saqlaydi.",
      ],
      correctAnswer:
        "Ushbu funksiya klassning ichki a'zolariga kirish huquqiga ega.",
    },
    {
      question: "C++: `new[]` va `delete[]` operatorlari qanday ishlatiladi?",
      answers: [
        "`new[]` dinamik massiv yaratish uchun ishlatiladi, `delete[]` esa uni o'chirish uchun.",
        "`new[]` faqat obyekt yaratadi, `delete[]` esa faqat o'zgartiradi.",
        "`new[]` o'zgaruvchi qiymatini saqlaydi, `delete[]` esa faqat saqlashga imkon beradi.",
        "`new[]` faqat ma'lumotlarni ko'rsatadi, `delete[]` esa qiymatlarni o'chiradi.",
      ],
      correctAnswer:
        "`new[]` dinamik massiv yaratish uchun ishlatiladi, `delete[]` esa uni o'chirish uchun.",
    },
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleStartGame = (name) => {
    setPlayerName(name);
    setIsPlaying(true);
    setShowRanking(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTime(0);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsPlaying(false);
      setShowRanking(true);
      saveRanking(score, playerName);
    }
  };

  const saveRanking = (finalScore, name) => {
    const newRanking = { name, score: finalScore, time };
    const updatedRankings = [...rankings, newRanking]
      .sort((a, b) => b.score - a.score || a.time - b.time)
      .slice(0, 5);
    setRankings(updatedRankings);
    localStorage.setItem("rankings", JSON.stringify(updatedRankings));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-200 to-blue-500 text-gray-800">
      {/* Liderlar ro‘yxati */}
      <header className="bg-blue-800 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-lg md:text-2xl font-bold text-center">
            Leaderboard
          </h1>
          <ul className="mt-2 text-sm md:text-base flex justify-center flex-wrap">
            {rankings.map((rank, index) => (
              <li
                key={index}
                className="mx-2 my-1 p-2 bg-blue-600 rounded-lg shadow-sm"
              >
                <p className="font-bold text-yellow-300">
                  {rank.name} — {rank.score} points
                </p>
                <p className="text-xs text-gray-300">{rank.time} seconds</p>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Asosiy o‘yinning qismi */}
      <div className="flex-grow">
        {!isPlaying && !showRanking && (
          <StartScreen onStart={handleStartGame} />
        )}
        {isPlaying && (
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        )}
        {showRanking && <Ranking rankings={rankings} />}
      </div>

      {/* Footer qismi */}
      <footer className="bg-blue-800 text-white py-4 text-center shadow-inner">
        <p className="text-sm md:text-base">
          Created with Muhammaddiyor💻 by{" "}
          <span className="font-bold text-yellow-400">Programmer</span>
        </p>
        <p className="text-xs mt-2 text-gray-300">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default App;
