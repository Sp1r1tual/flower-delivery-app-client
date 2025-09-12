import { Row } from "@/components/ui/wrappers/Row";
import { Container } from "@/components/ui/wrappers/Container";
import { CategoriesView } from "@/components/shop/CategoriesView";
import { ShopView } from "@/components/shop/ShopView";

const ShopPage = () => {
  return (
    <Row justify="center">
      <Container>
        <CategoriesView />
      </Container>
      <Container>
        <ShopView />
      </Container>
    </Row>
  );
};

export { ShopPage };
