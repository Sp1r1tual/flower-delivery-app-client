import { IShop, ICategory, IBackendCategory, IBackendProduct } from "@/types";

const mapBackendCategoryToCategory = (cat: IBackendCategory): ICategory => ({
  id: cat._id,
  name: cat.name,
});

const mapBackendProductToShopType = (item: IBackendProduct): IShop => ({
  id: item._id,
  name: item.name,
  price: item.price,
  imageUrl: item.imageUrl,
  createdAt: item.createdAt ?? "",
});

export { mapBackendCategoryToCategory, mapBackendProductToShopType };
