import { CategoriesItemProps } from "@/types";

import styles from "./styles/CategoriesItem.module.css";

const CategoriesItem = ({ text }: CategoriesItemProps) => {
  return (
    <div className={styles.item}>
      <span>{text || "No name"}</span>
    </div>
  );
};

export { CategoriesItem };
