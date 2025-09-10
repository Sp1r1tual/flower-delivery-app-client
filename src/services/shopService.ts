import { $api } from "@/api";

import { ShopType } from "@/types";

class ShopService {
  static getShop() {
    return $api.get<ShopType[]>("/shop");
  }

  static getCategories() {
    return $api.get<string[]>("/categories");
  }
}

export { ShopService };
