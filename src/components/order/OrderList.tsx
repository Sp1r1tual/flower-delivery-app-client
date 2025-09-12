import { OrderListProps } from "@/types";

import { OrderItem } from "./OrderItem";

import styles from "./styles/OrderList.module.css";

const OrderList = ({ order }: OrderListProps) => {
  return (
    <div className={styles.orderList}>
      {order.items.map((item) => (
        <OrderItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export { OrderList };
