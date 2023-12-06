import { useState } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (newsItem) => {
    setFavorites([...favorites, newsItem]);
  };

  const removeFromFavorites = (newsItemId) => {
    const updatedFavorites = favorites.filter((item) => item.id !== newsItemId);
    setFavorites(updatedFavorites);
  };

  const isFavorite = (newsItemId) => {
    return favorites.some((item) => item.id === newsItemId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};

export default useFavorites;
