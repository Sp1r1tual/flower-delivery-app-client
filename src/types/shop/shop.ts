type Category = { id: string; name: string };

type CategoriesListProps = {
  categoryNames: Category[];
};

type ShopType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  createdAt: string;
  onToggleFavorite: (id: string) => void;
};

type ShopItemProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

type ShopListProps = {
  shops: ShopType[];
};

type CategoriesItemProps = {
  text: string;
  isSelected?: boolean;
  onClick: () => void;
};

type SortProps = {
  sort: "byPrice" | "byDate";
  onChange: (value: "byPrice" | "byDate") => void;
};

type BackendCategory = { _id: string; name: string };

type BackendProduct = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  createdAt?: string;
};

type SortKey = "byPrice" | "byDate";

export type {
  Category,
  CategoriesListProps,
  CategoriesItemProps,
  ShopItemProps,
  ShopType,
  ShopListProps,
  SortProps,
  BackendCategory,
  BackendProduct,
  SortKey,
};
