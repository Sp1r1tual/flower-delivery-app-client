import { useShop } from "@/hooks/useShop";

import { ContentWrapper } from "@/components/ui/wrappers/ContentWrapper";
import { Sidebar } from "@/components/ui/wrappers/Sidebar";
import { CategoriesView } from "@/components/shop/CategoriesView";
import { ShopView } from "@/components/shop/ShopView";

const ShopPage = () => {
  const shopData = useShop();

  return (
    <ContentWrapper>
      <Sidebar>
        <CategoriesView
          categories={shopData.categories}
          isCategoriesLoading={shopData.isCategoriesLoading}
          selectedCategoryId={shopData.selectedCategoryId}
          onSelectCategory={shopData.selectCategory}
          onShowAllProducts={shopData.showAllProducts}
        />
      </Sidebar>

      <ShopView
        products={shopData.products}
        isProductsLoading={shopData.isProductsLoading}
        currentPage={shopData.currentPage}
        totalPages={shopData.totalPages}
        hasPrev={shopData.hasPrev}
        hasNext={shopData.hasNext}
        getPageNumbers={shopData.getPageNumbers}
        onPageChange={shopData.handlePageChange}
      />
    </ContentWrapper>
  );
};

export { ShopPage };
