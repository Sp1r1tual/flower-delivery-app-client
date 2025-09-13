import { useState } from "react";

import { useAppSelector, useAppDispatch } from "@/types/reduxHooks";
import { useSortedShops } from "@/hooks/shop/useSortedShop";

import { IShop, SortKeyType } from "@/types";

import { ShopItem } from "./ShopItem";
import { Sort } from "../sort/Sort";

import { setSort } from "@/store/redux/sortShopSlice";

import { localFavoriteShop } from "@/utils/state/localFavoriteShop";

import styles from "./styles/ShopList.module.css";

interface IShopListProps {
  shops: IShop[];
}

const ShopList = ({ shops }: IShopListProps) => {
  const dispatch = useAppDispatch();

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    localFavoriteShop(),
  );

  const sort = useAppSelector((state) => state.sort.sort);

  const sortedItems = useSortedShops(shops, sort, favoriteIds);

  const handleSortChange = (newSort: SortKeyType) => {
    dispatch(setSort(newSort));
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      let updated: string[];

      if (prev.includes(id)) {
        updated = prev.filter((i) => i !== id);
      } else {
        updated = [...prev, id];
      }

      localStorage.setItem("favoriteShops", JSON.stringify(updated));

      return updated;
    });
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
          isFavorite={favoriteIds.includes(shop.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export { ShopList };
