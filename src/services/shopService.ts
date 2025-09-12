import { $api } from "@/api";

import { BackendCategory, BackendProduct } from "@/types";

class ShopService {
  static getCategories() {
    return $api.get<BackendCategory[]>("/categories");
  }

  static getAllProducts() {
    return $api.get<BackendProduct[]>("/shop");
  }

  static getProductsByCategory(categoryId: string) {
    return $api.get<BackendProduct[]>(`/shop/category/${categoryId}`);
  }
}

export { ShopService };
