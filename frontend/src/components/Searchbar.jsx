import { useState } from "react";

const SearchBar = ({ onSelectExpression }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Функция для поиска фраз
  const handleSearch = async (input) => {
    setQuery(input);

    if (input.length < 2) {
      setSuggestions([]); // Очищаем, если ввели мало символов
      return;
    }

    try {
      //   const response = await fetch(`http://localhost:5000/api/expressions?query=${encodeURIComponent(input)}`);
      const response = await fetch(`https://dictionaryapi-wwbi.onrender.com/api/expressions/search?query=${encodeURIComponent(input)}`);

      const data = await response.json();
      setSuggestions(data); // Сохраняем только найденные выражения
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  return (
    <div className="relative z-10">
      <input
        type="text"
        placeholder="Введите фразу..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 border rounded dark:text-black"
      />

      {/* Блок с подсказками */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded shadow-lg mt-1 z-10">
          {suggestions.map((exp) => (
            <li
              key={exp.id}
              onClick={() => {
                onSelectExpression(exp); // Передаём выбранную фразу в Home.jsx
                setQuery(exp.english); // Заполняем input выбранной фразой
                setSuggestions([]); // Очищаем подсказки
              }}
              className="p-2 hover:bg-gray-200 cursor-pointer dark:text-black"
            >
              {exp.english} - {exp.russian}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;