import { Row } from "@/components/ui/wrappers/Row";
import { Container } from "@/components/ui/wrappers/Container";
import { BackBtn } from "@/components/ui/buttons/BackBtn";
import { OrderView } from "@/components/order/OrderView";

const OrderDetailsPage = () => {
  return (
    <>
      <Container showBorder={false}>
        <BackBtn to="/" />
      </Container>

      <Row margin="3rem">
        <Container>
          <OrderView />
        </Container>
      </Row>
    </>
  );
};

export { OrderDetailsPage };
