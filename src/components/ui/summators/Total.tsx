import styles from "./styles/Total.module.css";

interface ITotalProps {
  text: string;
  amount: number;
}

const Total = ({ amount, text }: ITotalProps) => {
  return (
    <div className={styles.total}>
      <span className={styles.amount}>{`${text}: ${amount} $`}</span>
    </div>
  );
};

export { Total };
