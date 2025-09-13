import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "@/types/reduxHooks";

import { DotsLoader } from "../ui/loaders/DotsLoader";
import { ShopList } from "./ShopList";

import { fetchAllProducts } from "@/store/redux/shopThunks";

import styles from "./styles/ShopView.module.css";

const ShopView = () => {
  const dispatch = useAppDispatch();

  const { products, isProductsLoading, selectedCategoryId } = useAppSelector(
    (state) => state.shop,
  );

  useEffect(() => {
    if (
      products.length === 0 &&
      selectedCategoryId === undefined &&
      !isProductsLoading
    ) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length, selectedCategoryId, isProductsLoading]);

  return (
    <div className={styles.shop}>
      {isProductsLoading ? (
        <div className={styles.loaderWrapper}>
          <DotsLoader />
        </div>
      ) : products.length === 0 ? (
        <p className={styles.emptyMessage}>No products available</p>
      ) : (
        <ShopList shops={products} />
      )}
    </div>
  );
};

export { ShopView };
