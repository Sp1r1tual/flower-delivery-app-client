import styles from "./styles/CategoriesItem.module.css";

interface ICategoriesItemProps {
  text: string;
  isSelected?: boolean;
  onClick: () => void;
}

const CategoriesItem = ({
  text,
  onClick,
  isSelected,
}: ICategoriesItemProps) => {
  return (
    <div
      className={`${styles.item} ${isSelected ? styles.active : ""}`}
      onClick={onClick}
    >
      <span>{text || "No name"}</span>
    </div>
  );
};

export { CategoriesItem };
