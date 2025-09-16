import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/types/reduxHooks";

import { IOrderFormData, ICartCheckoutPayload } from "@/types";

import { Row } from "@/components/ui/wrappers/Row";
import { ContentWrapper } from "@/components/ui/wrappers/ContentWrapper";
import { Container } from "@/components/ui/wrappers/Container";
import { Sidebar } from "@/components/ui/wrappers/Sidebar";
import { OrderForm } from "@/components/cart/OrderForm";
import { ToggleButton } from "@/components/ui/buttons/ToggleBtn";
import { CartView } from "@/components/cart/CartView";
import { checkoutCart } from "@/store/redux/cartThunks";
import { Checkout } from "@/components/cart/Checkout";
import { GoogleMaps } from "@/components/maps/GoogleMaps";

import { getStoreLocations } from "@/utils/cart/getStoreLocations";

import styles from "./styles/ShopCartPage.module.css";

const ShopCartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const addressRef = useRef<HTMLInputElement | null>(null);
  const selectedCoordsRef = useRef<google.maps.LatLng | null>(null);

  const { items, isLoading } = useAppSelector((state) => state.cart);

  const toggleGoogleMap = () => setIsOpen((prev) => !prev);

  const handleLocationSelect = (coords: google.maps.LatLng) => {
    selectedCoordsRef.current = coords;
  };

  const handleSubmit = async (formData: IOrderFormData) => {
    const payload: ICartCheckoutPayload = {
      ...formData,
      address: addressRef.current?.value || formData.address,
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
    <ContentWrapper>
      <Sidebar>
        <Container>
          <Container>
            <div
              className={`${styles.mapWrapper} ${isOpen ? styles.open : ""}`}
            >
              <GoogleMaps
                items={getStoreLocations(items)}
                onLocationSelect={handleLocationSelect}
                addressRef={addressRef}
              />
            </div>
            <ToggleButton
              isOpen={isOpen}
              onToggle={toggleGoogleMap}
              openText="Show Google Map"
              closeText="Hide Google Map"
            />
          </Container>

          <OrderForm onSubmit={handleSubmit} addressRef={addressRef} />
        </Container>
      </Sidebar>

      <Container showBorder={false} showPadding={false}>
        <CartView items={items} />
        <Row>
          <Checkout
            loading={isLoading}
            items={items}
            disabled={items.length === 0}
          />
        </Row>
      </Container>
    </ContentWrapper>
  );
};

export { ShopCartPage };
