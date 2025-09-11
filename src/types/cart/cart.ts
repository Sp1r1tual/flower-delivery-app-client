type CartType = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

type CartListProps = {
  cart: CartType[];
};

type CartSyncPayload = {
  id: string;
  quantity: number;
};

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

type CartCheckoutPayload = {
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  cart: { productId: string; quantity: number }[];
  orderDate: string;
};

type OrderResponse = {
  orderNumber: number;
  totalPrice: number;
  items: CartType[];
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export type {
  CartType,
  CartListProps,
  CartSyncPayload,
  OrderFormData,
  OrderType,
  CartCheckoutPayload,
  OrderResponse,
};
