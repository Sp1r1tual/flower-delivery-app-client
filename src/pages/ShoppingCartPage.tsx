import { useAppSelector, useAppDispatch } from "@/types/redux/reduxHooks";

import { Row } from "@/components/ui/wrappers/Row";
import { Container } from "@/components/ui/wrappers/Container";
import { OrderForm } from "@/components/cart/OrderForm";
import { CartView } from "@/components/cart/CartView";
import { Checkout } from "@/components/cart/Checkout";

import { syncCart } from "@/store/redux/cartThunks";

const ShoppingCartPage = () => {
  const dispatch = useAppDispatch();

  const { items, isLoading } = useAppSelector((state) => state.cart);

  const handleSubmit = () => {
    items.forEach((item) => {
      dispatch(syncCart({ id: item.id, quantity: item.quantity }));
    });
  };

  return (
    <>
      <Row>
        <Container>
          <OrderForm onSubmit={handleSubmit} />
        </Container>
        <Container>
          <CartView />
        </Container>
      </Row>

      <Checkout
        loading={isLoading}
        items={items}
        disabled={items.length === 0}
      />
    </>
  );
};

export { ShoppingCartPage };
