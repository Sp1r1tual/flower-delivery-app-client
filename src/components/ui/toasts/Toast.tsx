import { useEffect } from "react";

interface IToastProps {
  text: string;
  duration?: number;
  onClose: () => void;
}

import styles from "./styles/Toast.module.css";

const Toast = ({ text, duration = 2000, onClose }: IToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={styles.toast}>{text}</div>;
};

export { Toast };
