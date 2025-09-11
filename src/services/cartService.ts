import { $api } from "@/api";

import { CartCheckoutPayload, OrderResponse } from "@/types";

class CartService {
  static checkoutCart(payload: CartCheckoutPayload) {
    return $api.post<OrderResponse>("/cart/checkout", payload);
  }
}

export { CartService };
