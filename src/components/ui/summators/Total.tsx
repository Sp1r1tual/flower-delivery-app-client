import { TotalProps } from "@/types";

import styles from "./styles/Total.module.css";

const Total = ({ amount, text }: TotalProps) => {
  return (
    <div className={styles.total}>
      <span className={styles.amount}>{`${text}: ${amount} $`}</span>
    </div>
  );
};

export { Total };
