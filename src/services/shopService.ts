import { $api } from "@/api";

import { BackendCategory, BackendProduct } from "@/types";

class ShopService {
  static getCategories() {
    return $api.get<BackendCategory[]>("/categories");
  }

  static getShop(categoryId?: string) {
    const url = categoryId ? `/shop?category=${categoryId}` : "/shop";

    return $api.get<BackendProduct[]>(url);
  }
}

export { ShopService };
