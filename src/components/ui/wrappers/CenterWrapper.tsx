interface ICenterWrapperProps {
  children: React.ReactNode;
}

import styles from "./styles/CenterWrapper.module.css";

const CenterWrapper = ({ children }: ICenterWrapperProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export { CenterWrapper };
