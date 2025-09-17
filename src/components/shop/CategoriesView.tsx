import { useShop } from "@/hooks/useShop";

import { DotsLoader } from "../ui/loaders/DotsLoader";
import { CategoriesList } from "./CategoriesList";

import styles from "./styles/CategoriesView.module.css";

const CategoriesView = () => {
  const { categories, isCategoriesLoading } = useShop();

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
          <CategoriesList categoryNames={categories} />
        </>
      )}
    </div>
  );
};

export { CategoriesView };
