import { ICart } from "@/types";

import { CartList } from "./CartList";

import styles from "./styles/CartView.module.css";

interface ICartViewProps {
  items: ICart[];
}

const CartView = ({ items }: ICartViewProps) => {
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
