import { ContentWrapper } from "@/components/ui/wrappers/ContentWrapper";
import { Sidebar } from "@/components/ui/wrappers/Sidebar";
import { CategoriesView } from "@/components/shop/CategoriesView";
import { ShopView } from "@/components/shop/ShopView";

const ShopPage = () => {
  return (
    <>
      <ContentWrapper>
        <Sidebar>
          <CategoriesView />
        </Sidebar>
        <ShopView />
      </ContentWrapper>
    </>
  );
};

export { ShopPage };
