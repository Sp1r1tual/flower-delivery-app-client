import { useAppDispatch } from "@/types/reduxHooks";

import { ICart } from "@/types";

import { Counter } from "../ui/counters/Counter";

import {
  addItem,
  removeItem,
  updateItemQuantity,
} from "@/store/redux/cartSlice";

import styles from "./styles/CartItem.module.css";

const CartItem = ({ id, name, price, quantity, category, imageUrl }: ICart) => {
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    dispatch(addItem({ id, name, price, quantity: 1, category, imageUrl }));
  };

  const handleDecrease = () => {
    dispatch(removeItem({ id, quantity: 1 }));
  };

  const handleManualChange = (newQuantity: number) => {
    dispatch(updateItemQuantity({ id, quantity: newQuantity }));
  };

  return (
    <div className={styles.cartItem}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.wrapper}>
        <span className={styles.name}>{name}</span>

        <Counter
          initialValue={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onManualChange={handleManualChange}
        />
      </div>
    </div>
  );
};

export { CartItem };
