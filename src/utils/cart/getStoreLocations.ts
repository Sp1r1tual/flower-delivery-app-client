import { IStoreLocation, ICart } from "@/types";

const getStoreLocations = (items: ICart[]): IStoreLocation[] => {
  const stores = new Map<string, IStoreLocation>();

  items.forEach((item) => {
    const coords = item.category?.location?.coordinates;

    if (coords) {
      stores.set(item.category.id, {
        id: item.category.id,
        name: item.category.name,
        lat: +coords[1],
        lng: +coords[0],
      });
    }
  });

  return Array.from(stores.values());
};

export { getStoreLocations };
