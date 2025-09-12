import { ShopType, Category, BackendCategory, BackendProduct } from "@/types";

const mapBackendCategoryToCategory = (cat: BackendCategory): Category => ({
  id: cat._id,
  name: cat.name,
});

const mapBackendProductToShopType = (item: BackendProduct): ShopType => ({
  id: item._id,
  name: item.name,
  price: item.price,
  imageUrl: item.imageUrl,
  createdAt: item.createdAt ?? "",
  isFavorite: false,
  onToggleFavorite: () => {},
});

export { mapBackendCategoryToCategory, mapBackendProductToShopType };
