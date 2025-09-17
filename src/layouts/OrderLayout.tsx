import { Outlet } from "react-router-dom";

import { BackBtn } from "@/components/ui/buttons/BackBtn";

import styles from "./styles/OrderLayout.module.css";

const OrderLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.backBtnArea}>
        <BackBtn />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export { OrderLayout };
