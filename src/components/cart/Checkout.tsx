import { ICart } from "@/types";

import { Total } from "../ui/summators/Total";
import { SubmitBtn } from "../ui/buttons/SubmitBtn";

import styles from "./styles/Checkout.module.css";

interface ICheckoutProps {
  items: ICart[];
  loading: boolean;
  disabled?: boolean;
}

const Checkout = ({ loading, items, disabled = false }: ICheckoutProps) => {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * (item.price ?? 0),
    0,
  );

  return (
    <div className={styles.checkout}>
      <Total text="Total price" amount={totalAmount} />

      <SubmitBtn
        text="Submit"
        loading={loading}
        disabled={loading || disabled}
      />
    </div>
  );
};

export { Checkout };
