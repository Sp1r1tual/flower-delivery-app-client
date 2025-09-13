export interface ICart {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface ICartSyncPayload {
  id: string;
  quantity: number;
}

export interface ICartCheckoutPayload {
  cart: { productId: string; quantity: number }[];
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
}
