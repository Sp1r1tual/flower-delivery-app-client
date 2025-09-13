import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/types/reduxHooks";

import { IOrderFormData, ICartCheckoutPayload } from "@/types";

import { Sidebar } from "@/components/ui/wrappers/Sidebar";
import { OrderForm } from "@/components/cart/OrderForm";
import { CartView } from "@/components/cart/CartView";
import { Checkout } from "@/components/cart/Checkout";

import { checkoutCart } from "@/store/redux/cartThunks";
import { ContentWrapper } from "@/components/ui/wrappers/ContentWrapper";
import { Row } from "@/components/ui/wrappers/Row";

const ShopCartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, isLoading } = useAppSelector((state) => state.cart);

  const handleSubmit = async (formData: IOrderFormData) => {
    const payload: ICartCheckoutPayload = {
      ...formData,
      cart: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    const resultAction = await dispatch(checkoutCart(payload));

    if (checkoutCart.fulfilled.match(resultAction)) {
      const orderNumber = resultAction.payload.orderNumber;
      navigate(`/order/${orderNumber}`);
    }
  };

  return (
    <>
      <ContentWrapper>
        <Sidebar>
          <OrderForm onSubmit={handleSubmit} />
        </Sidebar>
        <CartView />
      </ContentWrapper>

      <Row>
        <Checkout
          loading={isLoading}
          items={items}
          disabled={items.length === 0}
        />
      </Row>
    </>
  );
};

export { ShopCartPage };
