import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "@/types/redux/reduxHooks";

import { DotsLoader } from "../ui/loaders/DotsLoader";
import { CartList } from "./CartList";

import { fetchCart } from "@/store/redux/cartThunks";

import styles from "./styles/CartView.module.css";

const CartView = () => {
  const dispatch = useAppDispatch();

  const { items, isLoading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchCart());
    }
  }, [dispatch, items]);

  return (
    <div className={styles.cart}>
      {isLoading ? (
        <DotsLoader />
      ) : items.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty</p>
      ) : (
        <CartList cart={items} />
      )}
    </div>
  );
};

export { CartView };
