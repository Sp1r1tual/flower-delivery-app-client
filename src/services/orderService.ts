import { $api } from "@/api";

import { OrderResponse } from "@/types";

class OrderService {
  static getOrderByOrderNumber(orderNumber: string) {
    return $api.get<OrderResponse>(`/order/${orderNumber}`);
  }
}

export { OrderService };
