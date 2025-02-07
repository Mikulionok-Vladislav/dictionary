import { useState } from "react";
import SearchBar from "../components/Searchbar";
import useFavorites from "../hooks/useFavorites";
import { speak } from "../utils/speak";

const Home = () => {
  const [selectedExpression, setSelectedExpression] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">🔍 Поиск выражений</h2>
      <SearchBar onSelectExpression={setSelectedExpression} />

      {/* Блок с деталями выражения */}
      {selectedExpression && (
        <div className="mt-4 p-4 border rounded-md shadow-md bg-white dark:bg-gray-800 dark:text-white transition-all">
          <h3 className="text-xl font-semibold">{selectedExpression.english}</h3>
          <p className="text-gray-600 dark:text-gray-300">{selectedExpression.russian}</p>
          <p className="mt-2 italic">Пример: {selectedExpression.example}</p>



          <button
            onClick={() => toggleFavorite(selectedExpression)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {favorites.some((fav) => fav.id === selectedExpression.id)
              ? "⭐ Удалить из избранного"
              : "☆ Добавить в избранное"}
          </button>

          {/* Кнопка для воспроизведения */}
          <button
            onClick={() => speak(selectedExpression.english)}
            className="mt-3 ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            ▶️ Прослушать
          </button>


          {/* <button
            onClick={() => toggleFavorite(selectedExpression)}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {favorites.some((fav) => fav.id === selectedExpression.id) ? "⭐ Удалить из избранного" : "☆ Добавить в избранное"}
          </button> */}
        </div>
      )}
    </div>
  );
};

export default Home;