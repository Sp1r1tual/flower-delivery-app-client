import { $api } from "@/api";

import { IBackendCategory, IBackendProduct } from "@/types";

class ShopService {
  static getCategories() {
    return $api.get<IBackendCategory[]>("/categories");
  }

  static getAllProducts() {
    return $api.get<IBackendProduct[]>("/shop");
  }

  static getProductsByCategory(categoryId: string) {
    return $api.get<IBackendProduct[]>(`/shop/category/${categoryId}`);
  }
}

export { ShopService };
