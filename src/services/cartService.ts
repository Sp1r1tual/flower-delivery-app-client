import { $api } from "@/api";

import { CartType } from "@/types";

type CartSyncPayload = Pick<CartType, "id" | "quantity">;

class CartService {
  static getCart() {
    return $api.get<CartType[]>("/cart");
  }

  static syncCart(payload: CartSyncPayload) {
    return $api.patch("/cart/sync", payload);
  }
}

export { CartService };
