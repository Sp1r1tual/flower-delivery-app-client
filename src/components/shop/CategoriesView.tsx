import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "@/types/redux/reduxHooks";

import { DotsLoader } from "../ui/loaders/DotsLoader";
import { CategoriesList } from "./CategoriesList";

import { fetchCategories } from "@/store/redux/shopThunks";

import styles from "./styles/CategoriesView.module.css";

const CategoriesView = () => {
  const dispatch = useAppDispatch();

  const { categories, isCategoriesLoading } = useAppSelector(
    (state) => state.shop,
  );

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return (
    <div className={styles.shops}>
      {isCategoriesLoading ? (
        <DotsLoader />
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
