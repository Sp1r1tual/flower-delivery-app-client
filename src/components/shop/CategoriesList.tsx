import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/types/redux/reduxHooks";

import { CategoriesListProps } from "@/types";

import { CategoriesItem } from "./CategoriesItem";

import { setSelectedCategory } from "@/store/redux/shopSlice";
import {
  fetchProductsByCategory,
  fetchAllProducts,
} from "@/store/redux/shopThunks";

import styles from "./styles/CategoriesList.module.css";

const CategoriesList = ({ categoryNames }: CategoriesListProps) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const selectedCategoryId = useAppSelector(
    (state) => state.shop.selectedCategoryId,
  );

  const toggleList = () => setIsOpen((prev) => !prev);

  const handleSelectCategory = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(fetchProductsByCategory(categoryId));
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={toggleList}>
        {isOpen ? "Hide shops" : "Show shops"}
      </button>

      <div className={`${styles.list} ${isOpen ? styles.open : ""}`}>
        {categoryNames.length > 0 && (
          <CategoriesItem
            key="all"
            text="All Shops"
            onClick={() => dispatch(fetchAllProducts())}
            isSelected={selectedCategoryId === undefined}
          />
        )}

        {categoryNames.map((category) => (
          <CategoriesItem
            key={category.id}
            text={category.name}
            onClick={() => handleSelectCategory(category.id)}
            isSelected={selectedCategoryId === category.id}
          />
        ))}
      </div>
    </>
  );
};

export { CategoriesList };
