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

type CartCheckoutPayload = {
  cart: { productId: string; quantity: number }[];
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export type { CartType, CartListProps, CartSyncPayload, CartCheckoutPayload };
