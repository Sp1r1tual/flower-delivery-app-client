import { ICart } from "@/types";

import { CartItem } from "./CartItem";

import styles from "./styles/CartList.module.css";

interface CartListProps {
  cart: ICart[];
}

const CartList = ({ cart }: CartListProps) => {
  return (
    <div className={styles.list}>
      {cart.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          category={cartItem.category}
          id={cartItem.id}
          price={cartItem.price}
          quantity={cartItem.quantity}
          name={cartItem.name}
          imageUrl={cartItem.imageUrl}
        />
      ))}
    </div>
  );
};

export { CartList };
