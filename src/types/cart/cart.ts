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
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type { CartType, CartListProps, CartSyncPayload, OrderFormData };
