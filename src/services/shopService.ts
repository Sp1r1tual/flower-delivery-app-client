import { $api } from "@/api";

import { IBackendCategory, IBackendProduct } from "@/types";

class ShopService {
  static getCategories() {
    return $api.get<IBackendCategory[]>("/categories");
  }

  static getAllProducts(page: number, limit: number) {
    return $api.get<{
      items: IBackendProduct[];
      total: number;
      totalPages: number;
    }>("/shop", { params: { page, limit } });
  }

  static getProductsByCategory(
    categoryId: string,
    page: number,
    limit: number,
  ) {
    return $api.get<{
      items: IBackendProduct[];
      total: number;
      totalPages: number;
    }>(`/shop/category/${categoryId}`, { params: { page, limit } });
  }
}

export { ShopService };
