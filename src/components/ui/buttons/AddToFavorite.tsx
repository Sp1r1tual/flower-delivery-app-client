import heartIcon from "@/assets/favorite-svgrepo-com.svg";
import heartFilled from "@/assets/favorite-filled-svgrepo-com.svg";

import styles from "./styles/AddToFavorite.module.css";

interface IAddToFavoriteProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const AddToFavorite = ({ isFavorite, onToggle }: IAddToFavoriteProps) => {
  return (
    <button className={styles.favoriteBtn} onClick={onToggle} type="button">
      <img
        src={isFavorite ? heartFilled : heartIcon}
        alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
      />
    </button>
  );
};

export { AddToFavorite };
