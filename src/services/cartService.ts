import { $api } from "@/api";

import { ICartCheckoutPayload, IOrderResponse } from "@/types";

class CartService {
  static checkoutCart(payload: ICartCheckoutPayload) {
    return $api.post<IOrderResponse>("/cart/checkout", payload);
  }
}

export { CartService };
