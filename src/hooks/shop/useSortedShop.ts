import { ShopType, SortKey } from "@/types";

const useSortedShops = (
  shops: ShopType[],
  sort: SortKey,
  favoriteIds: string[],
) => {
  return [...shops].sort((a, b) => {
    const aFav = favoriteIds.includes(a.id) ? 1 : 0;
    const bFav = favoriteIds.includes(b.id) ? 1 : 0;

    if (bFav - aFav !== 0) return bFav - aFav;

    if (sort === "byPrice") return (a.price ?? 0) - (b.price ?? 0);
    if (sort === "byDate")
      return (
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
      );

    return 0;
  });
};

export { useSortedShops };
