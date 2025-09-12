import { useEffect } from "react";

import { ToastProps } from "@/types";

import styles from "./styles/Toast.module.css";

const Toast = ({ text, duration = 2000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={styles.toast}>{text}</div>;
};

export { Toast };
