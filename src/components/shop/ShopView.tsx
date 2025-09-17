import { IShop } from "@/types";

import { DotsLoader } from "../ui/loaders/DotsLoader";
import { Pagination } from "../ui/paginations/Pagination";
import { ShopList } from "./ShopList";

import styles from "./styles/ShopView.module.css";

interface ShopViewProps {
  products: IShop[];
  isProductsLoading: boolean;
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  getPageNumbers: (totalPages: number) => number[];
  onPageChange: (page: number) => void;
}

const ShopView = ({
  products,
  isProductsLoading,
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
  getPageNumbers,
  onPageChange,
}: ShopViewProps) => {
  return (
    <div className={styles.shop}>
      {isProductsLoading ? (
        <div className={styles.loaderWrapper}>
          <DotsLoader />
        </div>
      ) : products.length === 0 ? (
        <div className={styles.emptyWrapper}>
          <p className={styles.emptyMessage}>No products available</p>
        </div>
      ) : (
        <>
          <ShopList shops={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPageChange={onPageChange}
            getPageNumbers={getPageNumbers}
          />
        </>
      )}
    </div>
  );
};

export { ShopView };
