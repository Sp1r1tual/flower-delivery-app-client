import { IBtnProps } from "./types/types";

import styles from "./styles/CommonBtn.module.css";

const CommonBtn = ({
  text,
  className = "",
  disabled = false,
  onClick,
}: IBtnProps) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export { CommonBtn };
