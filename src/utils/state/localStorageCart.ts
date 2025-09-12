import { CartType } from "@/types";

const CART_STORAGE_KEY = "cart";

const saveCartToLocalStorage = (items: CartType[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const loadCartFromLocalStorage = (): CartType[] => {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export { saveCartToLocalStorage, loadCartFromLocalStorage };
