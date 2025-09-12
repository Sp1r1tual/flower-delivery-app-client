const FAVORITES_KEY = "favoriteShops";

const localFavoriteShop = (): string[] => {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
};

export { localFavoriteShop };
