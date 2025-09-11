import { useAppSelector } from "@/types/redux/reduxHooks";

import { CartList } from "./CartList";

import styles from "./styles/CartView.module.css";

const CartView = () => {
  const { items } = useAppSelector((state) => state.cart);

  return (
    <div className={styles.cart}>
      {items.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty</p>
      ) : (
        <CartList cart={items} />
      )}
    </div>
  );
};

export { CartView };
