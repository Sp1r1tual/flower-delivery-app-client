import { OrderItemProps } from "@/types";

import styles from "./styles/OrderItem.module.css";

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <div className={styles.orderItem}>
      <img
        src={item.product.imageUrl}
        alt={item.name}
        className={styles.orderIcons}
      />
      <span className={styles.itemName}>{item.name}</span>
      <span className={styles.quantity}>x {item.quantity}</span>
    </div>
  );
};

export { OrderItem };
