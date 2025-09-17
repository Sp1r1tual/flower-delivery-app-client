export interface ICategory {
  id: string;
  name: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface IShop {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: ICategory;
  createdAt: string;
}

export interface IProductsResponse {
  products: IShop[];
  total: number;
  totalPages: number;
}

export interface IBackendCategory {
  _id: string;
  name: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface IBackendProduct {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: IBackendCategory;
  createdAt?: string;
}

export type SortKeyType = "byPrice" | "byDate";
