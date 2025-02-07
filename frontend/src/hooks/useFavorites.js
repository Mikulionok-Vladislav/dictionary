import { useState, useEffect } from "react";

/**
 * Хук для управления избранными выражениями в localStorage
 */
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Загружаем избранное при первом рендере
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Функция для добавления/удаления выражения
  const toggleFavorite = (expression) => {
    const isFavorite = favorites.some((fav) => fav.id === expression.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== expression.id);
    } else {
      updatedFavorites = [...favorites, expression];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
