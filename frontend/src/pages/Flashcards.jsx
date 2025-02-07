import { useState, useEffect } from "react";
import axios from "axios";

const Flashcards = () => {
  const [expressions, setExpressions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expressions");
        setExpressions(response.data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, []);

  if (expressions.length === 0) {
    return <p className="text-center mt-4">Загрузка выражений...</p>;
  }

  const handleNext = () => {
    setShowAnswer(false);
    setIndex((prevIndex) => (prevIndex + 1) % expressions.length);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div
        className="relative w-80 h-48 p-6 border rounded-lg shadow-lg cursor-pointer bg-white dark:bg-gray-800 flex items-center justify-center"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {!showAnswer ? (
          <h2
            className="text-xl font-bold transition-transform duration-500"
            style={{ animation: "scale-in 0.3s forwards" }}
          >
            {expressions[index].english}
          </h2>
        ) : (
          <div
            className="text-center transition-transform duration-500"
            style={{ animation: "scale-in 0.3s forwards, scale-out 0.3s reverse" }}
          >
            <p className="text-lg">{expressions[index].russian}</p>
            <p className="mt-2 italic text-gray-400">{expressions[index].example}</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex space-x-4">
        <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleNext}>
          Не знаю
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleNext}>
          Знаю
        </button>
      </div>

      {/* Анимации для масштабирования */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scale-out {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Flashcards;