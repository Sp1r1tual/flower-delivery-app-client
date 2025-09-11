import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "@/types/redux/reduxHooks";

import { DotsLoader } from "../ui/loaders/DotsLoader";
import { ShopList } from "./ShopList";

import { fetchProducts } from "@/store/redux/shopThunks";

import styles from "./styles/ShopView.module.css";

const ShopView = () => {
  const dispatch = useAppDispatch();

  const { products, isProductsLoading } = useAppSelector((state) => state.shop);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  return (
    <div className={styles.shop}>
      {isProductsLoading ? (
        <DotsLoader />
      ) : products.length === 0 ? (
        <p className={styles.emptyMessage}>No products available</p>
      ) : (
        <ShopList shops={products} />
      )}
    </div>
  );
};

export { ShopView };
