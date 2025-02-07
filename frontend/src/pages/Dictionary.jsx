import { useEffect, useState } from "react";
import axios from "axios";
import useFavorites from "../hooks/useFavorites";
import { speak } from "../utils/speak";

const Dictionary = () => {
  const [expressions, setExpressions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedExpression, setSelectedExpression] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false); // Новое состояние
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/expressions?page=${page}&limit=${limit}`
      );
      setExpressions(response.data);

      // Проверка: если получено меньше записей, чем limit — это последняя страница
      setIsLastPage(response.data.length < limit);
    };
    fetchData();
  }, [page, limit]);

  const toggleExpression = (id) => {
    setSelectedExpression(selectedExpression === id ? null : id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">📖 Словарь</h2>

      {/* Выбор количества записей */}
      <select
        onChange={(e) => setLimit(Number(e.target.value))}
        className="mb-4 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>

      <ul>
        {expressions.map((exp) => (
          <li key={exp.id} className="border-b p-2 dark:border-gray-700">
            <button
              onClick={() => toggleExpression(exp.id)}
              className="w-full text-left font-semibold dark:text-white"
            >
              {exp.english} - {exp.russian}
            </button>

            {/* Раскрывающийся блок с деталями */}
            {selectedExpression === exp.id && (
              <div className="mt-2 p-4 border rounded-md shadow-md transition-colors duration-300 bg-gray-100 dark:bg-gray-800 dark:text-white">
                <p className="text-gray-600 dark:text-gray-300">{exp.russian}</p>
                <p className="mt-2 italic">Пример: {exp.example}</p>

                <button
                  onClick={() => toggleFavorite(exp)}
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {favorites.some((fav) => fav.id === exp.id)
                    ? "⭐ Удалить из избранного"
                    : "☆ Добавить в избранное"}
                </button>

                {/* Кнопка для воспроизведения */}
                <button
                  onClick={() => speak(exp.english)}
                  className="mt-3 ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  ▶️ Прослушать
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Кнопки пагинации */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md disabled:opacity-50"
        >
          ⬅️ Назад
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={isLastPage}  /* Отключаем кнопку, если достигнута последняя страница */
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md disabled:opacity-50"
        >
          Вперед ➡️
        </button>
      </div>
    </div>
  );
};

export default Dictionary;