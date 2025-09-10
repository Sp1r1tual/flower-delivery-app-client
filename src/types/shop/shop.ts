type CategoriesListProps = {
  categoryNames: string[];
};

type CategoriesItemProps = {
  text: string;
};

type ShopItemProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

type ShopType = {
  id: string;
  name: string;
  price: number;
  createdAt?: string;
  imageUrl: string;
};

type ShopListProps = {
  shops: ShopType[];
};

type SortProps = {
  sort: "byPrice" | "byDate";
  onChange: (value: "byPrice" | "byDate") => void;
};

type SortKey = "byPrice" | "byDate";

export type {
  CategoriesListProps,
  CategoriesItemProps,
  ShopItemProps,
  ShopType,
  ShopListProps,
  SortProps,
  SortKey,
};
