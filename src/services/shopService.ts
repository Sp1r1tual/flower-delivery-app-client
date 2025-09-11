import { $api } from "@/api";

import { ShopType, Category } from "@/types";

class ShopService {
  static getCategories() {
    return $api.get<Category[]>("/categories");
  }

  static getShop(categoryId?: string) {
    const url = categoryId ? `/shop?category=${categoryId}` : "/shop";

    return $api.get<ShopType[]>(url);
  }
}

export { ShopService };
