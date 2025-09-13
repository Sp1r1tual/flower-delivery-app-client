import { IBtnProps } from "./types/types";

import styles from "./styles/SubmitBtn.module.css";

const SubmitBtn = ({
  text,
  className = "",
  loading,
  disabled = false,
}: IBtnProps) => {
  return (
    <button
      type="submit"
      form="orderForm"
      className={`${styles.submitButton} ${className}`}
      disabled={loading || disabled}
    >
      {text}
    </button>
  );
};

export { SubmitBtn };
