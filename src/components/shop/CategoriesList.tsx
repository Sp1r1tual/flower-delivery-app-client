import { useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/types/reduxHooks";

import { ICategory } from "@/types";

import { CategoriesItem } from "./CategoriesItem";

import { ToggleButton } from "../ui/buttons/ToggleBtn";

import { setSelectedCategory } from "@/store/redux/shopSlice";
import {
  fetchProductsByCategory,
  fetchAllProducts,
} from "@/store/redux/shopThunks";

import styles from "./styles/CategoriesList.module.css";

interface ICategoriesListProps {
  categoryNames: ICategory[];
}

const CategoriesList = ({ categoryNames }: ICategoriesListProps) => {
  const dispatch = useAppDispatch();

  const isOpenRef = useRef(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const selectedCategoryId = useAppSelector(
    (state) => state.shop.selectedCategoryId,
  );

  const toggleList = () => {
    isOpenRef.current = !isOpenRef.current;

    if (listRef.current && styles.open) {
      listRef.current.classList.toggle(styles.open, isOpenRef.current);
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(fetchProductsByCategory(categoryId));
  };

  return (
    <>
      <ToggleButton
        isOpenRef={isOpenRef}
        onToggle={toggleList}
        openText="Show shops"
        closeText="Hide shops"
      />

      <div ref={listRef} className={styles.list}>
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
