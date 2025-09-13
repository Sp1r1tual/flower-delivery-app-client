import { ICart } from "@/types";

const CART_STORAGE_KEY = "cart";

const saveCartToLocalStorage = (items: ICart[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const loadCartFromLocalStorage = (): ICart[] => {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export { saveCartToLocalStorage, loadCartFromLocalStorage };
