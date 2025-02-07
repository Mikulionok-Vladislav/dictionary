import { useState } from "react";
import useFavorites from "../hooks/useFavorites";
import { speak } from "../utils/speak";


const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedExpression, setSelectedExpression] = useState(null);

  const toggleExpression = (id) => {
    setSelectedExpression(selectedExpression === id ? null : id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">⭐ Избранное</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Вы еще ничего не добавили в избранное.</p>
      ) : (
        <ul>
          {favorites.map((exp) => (
            <li key={exp.id} className="border-b p-2 dark:border-gray-700">
              <button
                onClick={() => toggleExpression(exp.id)}
                className="w-full text-left font-semibold dark:text-white"
              >
                {exp.english} - {exp.russian}
              </button>

              {/* Раскрывающийся блок */}
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
      )}
    </div>
  );
};

export default Favorites;