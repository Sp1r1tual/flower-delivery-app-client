import { RowProps } from "@/types";

import styles from "./styles/Row.module.css";

const Row = ({
  children,
  gap = "1rem",
  justify = "center",
  margin,
}: RowProps) => {
  return (
    <div
      className={styles.row}
      style={{ gap, justifyContent: justify, margin }}
    >
      {children}
    </div>
  );
};

export { Row };
