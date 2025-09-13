import styles from "./styles/Row.module.css";

interface IRowProps {
  children: React.ReactNode;
  gap?: string;
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  margin?: string | number;
}

const Row = ({
  children,
  gap = "1rem",
  justify = "center",
  margin,
}: IRowProps) => {
  return (
    <div
      className={styles.row}
      style={{ gap, justifyContent: justify, margin }}
    >
      {children}
    </div>
  );
};

export { Row };
