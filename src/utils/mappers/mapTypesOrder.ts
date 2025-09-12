import { OrderResponse, OrderItem } from "@/types";

const mapBackendOrderItems = (order: OrderResponse): OrderResponse => {
  return {
    ...order,
    items: order.items.map((item: OrderItem) => ({
      ...item,
      id: item._id,
    })),
  };
};

export { mapBackendOrderItems };
