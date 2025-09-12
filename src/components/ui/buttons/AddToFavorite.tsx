import { AddToFavoriteProps } from "@/types";

import heartIcon from "@/assets/favorite-svgrepo-com.svg";
import heartFilled from "@/assets/favorite-filled-svgrepo-com.svg";

import styles from "./styles/AddToFavorite.module.css";

const AddToFavorite = ({ isFavorite, onToggle }: AddToFavoriteProps) => {
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
