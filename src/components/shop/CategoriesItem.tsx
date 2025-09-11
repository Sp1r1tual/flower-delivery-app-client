import { CategoriesItemProps } from "@/types";

import styles from "./styles/CategoriesItem.module.css";

const CategoriesItem = ({ text, onClick, isSelected }: CategoriesItemProps) => {
  return (
    <div
      className={`${styles.item} ${isSelected ? styles.active : ""}`}
      onClick={onClick}
    >
      <span>{text || "No name"}</span>
    </div>
  );
};

export { CategoriesItem };
