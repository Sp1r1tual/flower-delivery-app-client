import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";

import { IOrderResponse, IApiError } from "@/types";

import { OrderService } from "@/services/orderService";

import { DotsLoader } from "../ui/loaders/DotsLoader";
import { OrderList } from "./OrderList";

import { mapBackendOrderItems } from "@/utils/mappers/mapTypesOrder";

import styles from "./styles/OrderView.module.css";

const OrderView = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<IOrderResponse | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (orderNumber) {
          const res = await OrderService.getOrderByOrderNumber(orderNumber);

          setOrder(mapBackendOrderItems(res.data));
        }
      } catch (error) {
        const err = error as AxiosError<IApiError>;
        console.error(err.response?.data.message);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (!order) return <DotsLoader />;

  return (
    <div className={styles.order}>
      <h2>Order Details</h2>
      <h3>Order #{order.orderNumber}</h3>

      <div className={styles.order}>
        <OrderList order={order} />
      </div>

      <div className={styles.details}>
        <p>
          <span>Total:</span>
          <span>${order.totalPrice.toFixed(2)}</span>
        </p>
        <p>
          <span>Delivery Address:</span>
          <span>{order.address}</span>
        </p>
        <p>
          <span>Date:</span>
          <span>{new Date().toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
};

export { OrderView };
