import { IOrderResponse } from "@/types";

import { OrderItem } from "./OrderItem";

import styles from "./styles/OrderList.module.css";

interface IOrderListProps {
  order: IOrderResponse;
}

const OrderList = ({ order }: IOrderListProps) => {
  return (
    <div className={styles.orderList}>
      {order.items.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export { OrderList };
