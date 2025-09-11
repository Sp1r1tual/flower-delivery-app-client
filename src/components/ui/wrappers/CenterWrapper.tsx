import { CenterWrapperProps } from "@/types";

import styles from "./styles/CenterWrapper.module.css";

const CenterWrapper = ({ children }: CenterWrapperProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export { CenterWrapper };
