import { useState } from "react";

import { CategoriesListProps } from "@/types";

import { CategoriesItem } from "./CategoriesItem";

import styles from "./styles/CategoriesList.module.css";

const CategoriesList = ({ categoryNames }: CategoriesListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => setIsOpen((prev) => !prev);

  return (
    <>
      <button className={styles.toggleButton} onClick={toggleList}>
        {isOpen ? "Hide shops" : "Show shops"}
      </button>

      <div className={`${styles.list} ${isOpen ? styles.open : ""}`}>
        {categoryNames.map((name) => (
          <CategoriesItem key={name} text={name} />
        ))}
      </div>
    </>
  );
};

export { CategoriesList };
