import { CartType } from "../cart/cart";

type OrderFormData = {
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

type OrderType = {
  formData: OrderFormData[];
  cartData: CartType[];
};

type OrderProduct = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
};

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: OrderProduct;
};

type OrderResponse = {
  items: OrderItem[];
  orderNumber: number;
  totalPrice: number;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

type OrderListProps = {
  order: OrderResponse;
};

type OrderItemProps = {
  item: OrderItem;
};

export type {
  OrderFormData,
  OrderType,
  OrderProduct,
  OrderItem,
  OrderResponse,
  OrderListProps,
  OrderItemProps,
};
