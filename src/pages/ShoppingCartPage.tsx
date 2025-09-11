import { useAppSelector, useAppDispatch } from "@/types/redux/reduxHooks";

import { OrderFormData, CartCheckoutPayload } from "@/types";

import { CenterWrapper } from "@/components/ui/wrappers/CenterWrapper";
import { Row } from "@/components/ui/wrappers/Row";
import { Container } from "@/components/ui/wrappers/Container";
import { OrderForm } from "@/components/cart/OrderForm";
import { CartView } from "@/components/cart/CartView";
import { Checkout } from "@/components/cart/Checkout";

import { checkoutCart } from "@/store/redux/cartThunks";

const ShoppingCartPage = () => {
  const dispatch = useAppDispatch();

  const { items, isLoading } = useAppSelector((state) => state.cart);

  const handleSubmit = (formData: OrderFormData) => {
    const payload: CartCheckoutPayload = {
      ...formData,
      cart: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    dispatch(checkoutCart(payload));
  };

  return (
    <CenterWrapper>
      <Container showBorder={false}>
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
      </Container>
    </CenterWrapper>
  );
};

export { ShoppingCartPage };
