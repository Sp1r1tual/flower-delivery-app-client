import { IOrderResponse, OrderItemType } from "@/types";

const mapBackendOrderItems = (order: IOrderResponse): IOrderResponse => {
  return {
    ...order,
    items: order.items.map((item: OrderItemType) => ({
      ...item,
      id: item._id,
    })),
  };
};

export { mapBackendOrderItems };
