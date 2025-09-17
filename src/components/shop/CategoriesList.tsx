import { useRef } from "react";

import { ICategory } from "@/types";

import { ToggleButton } from "../ui/buttons/ToggleBtn";
import { CategoriesItem } from "./CategoriesItem";

import styles from "./styles/CategoriesList.module.css";

interface ICategoriesListProps {
  categoryNames: ICategory[];
  selectedCategoryId: string | undefined;
  onSelectCategory: (id: string) => void;
  onShowAllProducts: () => void;
}

const CategoriesList = ({
  categoryNames,
  selectedCategoryId,
  onSelectCategory,
  onShowAllProducts,
}: ICategoriesListProps) => {
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
        <CategoriesItem
          key="all"
          text="All Shops"
          onClick={onShowAllProducts}
          isSelected={selectedCategoryId === undefined}
        />

        {categoryNames.map((category) => (
          <CategoriesItem
            key={category.id}
            text={category.name}
            onClick={() => onSelectCategory(category.id)}
            isSelected={selectedCategoryId === category.id}
          />
        ))}
      </div>
    </>
  );
};

export { CategoriesList };
