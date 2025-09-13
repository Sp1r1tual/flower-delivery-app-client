export interface IOrderFormData {
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IOrderProduct {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface IOrderItemBackend {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  product: IOrderProduct;
}

export type OrderItemType = IOrderItemBackend & { id: string };

export interface IOrderResponse {
  items: OrderItemType[];
  orderNumber: number;
  totalPrice: number;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
}
