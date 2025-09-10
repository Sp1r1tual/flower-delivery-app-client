import { useAppSelector, useAppDispatch } from "@/types/redux/reduxHooks";

import { ShopListProps, SortKey } from "@/types";

import { ShopItem } from "./ShopItem";
import { Sort } from "../sort/Sort";

import { setSort } from "@/store/redux/sortShopSlice";

import styles from "./styles/ShopList.module.css";

const ShopList = ({ shops }: ShopListProps) => {
  const dispatch = useAppDispatch();

  const sort = useAppSelector((state) => state.sort.sort);

  const sortedItems = [...shops].sort((a, b) => {
    if (sort === "byPrice") return (a.price ?? 0) - (b.price ?? 0);
    if (sort === "byDate")
      return (
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
      );
    return 0;
  });

  const handleSortChange = (newSort: SortKey) => {
    dispatch(setSort(newSort));
  };

  return (
    <div className={styles.list}>
      <div className={styles.mobileSort}>
        <Sort sort={sort} onChange={handleSortChange} />
      </div>

      {sortedItems.map((shop) => (
        <ShopItem
          key={shop.id}
          id={shop.id}
          price={shop.price}
          name={shop.name}
          imageUrl={shop.imageUrl}
        />
      ))}
    </div>
  );
};

export { ShopList };
