import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "@/components/shop/styles/ShopItem.module.css";

const ShopImageSkeleton = () => {
  return (
    <div className={styles.item}>
      <Skeleton className={styles.image || ""} borderRadius="0.5rem" />
    </div>
  );
};

export { ShopImageSkeleton };
