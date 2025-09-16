import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/types/reduxHooks";

import { IOrderFormData, ICartCheckoutPayload, IStoreLocation } from "@/types";

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

import styles from "./styles/ShopCartPage.module.css";

const ShopCartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const addressRef = useRef<HTMLInputElement | null>(null);

  const { items, isLoading } = useAppSelector((state) => state.cart);

  const getStoreLocations = (): IStoreLocation[] => {
    const stores = new Map();

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

  const toggleGoogleMap = () => setIsOpen((prev) => !prev);

  const handleLocationSelect = (addr: string) => {
    if (addressRef.current) {
      const inputElement = addressRef.current as HTMLInputElement & {
        setFormValue?: (address: string) => void;
      };

      if (inputElement.setFormValue) {
        inputElement.setFormValue(addr);
      } else {
        inputElement.value = addr;
      }
    }
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
                items={getStoreLocations()}
                onLocationSelect={handleLocationSelect}
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
        <CartView />
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
