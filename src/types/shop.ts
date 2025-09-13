export interface ICategory {
  id: string;
  name: string;
}

export interface IShop {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  createdAt: string;
}

export interface IBackendCategory {
  _id: string;
  name: string;
}

export interface IBackendProduct {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  createdAt?: string;
}

export type SortKeyType = "byPrice" | "byDate";
