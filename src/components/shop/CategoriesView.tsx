import { ICategory } from "@/types";

import { DotsLoader } from "../ui/loaders/DotsLoader";
import { CategoriesList } from "./CategoriesList";

import styles from "./styles/CategoriesView.module.css";

interface CategoriesViewProps {
  categories: ICategory[];
  isCategoriesLoading: boolean;
  selectedCategoryId: string | undefined;
  onSelectCategory: (categoryId: string) => void;
  onShowAllProducts: () => void;
}

const CategoriesView = ({
  categories,
  isCategoriesLoading,
  selectedCategoryId,
  onSelectCategory,
  onShowAllProducts,
}: CategoriesViewProps) => {
  return (
    <div className={styles.shops}>
      {isCategoriesLoading ? (
        <div className={styles.loaderWrapper}>
          <DotsLoader />
        </div>
      ) : categories.length === 0 ? (
        <p className={styles.emptyMessage}>No categories available</p>
      ) : (
        <>
          <span className={styles.header}>Shops:</span>
          <CategoriesList
            categoryNames={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={onSelectCategory}
            onShowAllProducts={onShowAllProducts}
          />
        </>
      )}
    </div>
  );
};

export { CategoriesView };
