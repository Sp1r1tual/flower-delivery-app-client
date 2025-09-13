import styles from "./styles/Container.module.css";

interface IContainerProps {
  children: React.ReactNode;
  position?: "left" | "center" | "right";
  showBorder?: boolean;
}

const Container = ({
  children,
  position = "center",
  showBorder = true,
}: IContainerProps) => {
  return (
    <div
      className={`${styles.container} ${styles[position]} ${!showBorder ? styles.noBorder : ""}`}
    >
      {children}
    </div>
  );
};

export { Container };
