import { ContainerProps } from "@/types";

import styles from "./styles/Container.module.css";

const Container = ({
  children,
  position = "center",
  showBorder = true,
}: ContainerProps) => {
  return (
    <div
      className={`${styles.container} ${styles[position]} ${!showBorder ? styles.noBorder : ""}`}
    >
      {children}
    </div>
  );
};

export { Container };
