import { $api } from "@/api";

import { IOrderResponse } from "@/types";

class OrderService {
  static getOrderByOrderNumber(orderNumber: string) {
    return $api.get<IOrderResponse>(`/order/${orderNumber}`);
  }
}

export { OrderService };
