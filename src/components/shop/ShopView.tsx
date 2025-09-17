import { useShop } from "@/hooks/useShop";

import { DotsLoader } from "../ui/loaders/DotsLoader";
import { ShopList } from "./ShopList";
import { Pagination } from "../ui/paginations/Pagination";

import styles from "./styles/ShopView.module.css";

const ShopView = () => {
  const {
    products,
    isProductsLoading,
    currentPage,
    totalPages,
    hasPrev,
    hasNext,
    getPageNumbers,
    handlePageChange,
  } = useShop();

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
            onPageChange={handlePageChange}
            getPageNumbers={getPageNumbers}
          />
        </>
      )}
    </div>
  );
};

export { ShopView };
