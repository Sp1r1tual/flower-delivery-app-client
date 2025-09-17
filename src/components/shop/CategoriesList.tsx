import { useRef } from "react";

import { useShop } from "@/hooks/useShop";

import { ICategory } from "@/types";

import { CategoriesItem } from "./CategoriesItem";
import { ToggleButton } from "../ui/buttons/ToggleBtn";

import styles from "./styles/CategoriesList.module.css";

interface ICategoriesListProps {
  categoryNames: ICategory[];
}

const CategoriesList = ({ categoryNames }: ICategoriesListProps) => {
  const { selectedCategoryId, selectCategory, showAllProducts } = useShop();

  const isOpenRef = useRef(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const toggleList = () => {
    isOpenRef.current = !isOpenRef.current;

    if (listRef.current && styles.open) {
      listRef.current.classList.toggle(styles.open, isOpenRef.current);
    }
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
            onClick={showAllProducts}
            isSelected={selectedCategoryId === undefined}
          />
        )}

        {categoryNames.map((category) => (
          <CategoriesItem
            key={category.id}
            text={category.name}
            onClick={() => selectCategory(category.id)}
            isSelected={selectedCategoryId === category.id}
          />
        ))}
      </div>
    </>
  );
};

export { CategoriesList };
