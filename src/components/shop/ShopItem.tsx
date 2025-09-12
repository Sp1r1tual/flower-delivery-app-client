import { useState } from "react";

import { useAppDispatch } from "@/types/redux/reduxHooks";

import { ShopItemProps, CartType } from "@/types";

import { CommonBtn } from "../ui/buttons/CommonBtn";
import { AddToFavorite } from "../ui/buttons/AddToFavorite";
import { Toast } from "../ui/toasts/Toast";

import { addItem } from "@/store/redux/cartSlice";

import styles from "./styles/ShopItem.module.css";

const ShopItem = ({
  id,
  name,
  price,
  imageUrl,
  isFavorite,
  onToggleFavorite,
}: ShopItemProps) => {
  const dispatch = useAppDispatch();

  const [showToast, setShowToast] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    const item: CartType = { id, name, price, imageUrl, quantity: 1 };

    dispatch(addItem(item));
    setShowToast(true);
  };

  return (
    <div
      className={styles.item}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={name} className={styles.image} />

      <span className={styles.price}>Price: {price}</span>
      <span className={styles.name}>{name}</span>

      <div className={styles.buttonsWrapper}>
        <div className={styles.addToCartWrapper}>
          <CommonBtn text="Add to cart" onClick={handleAddToCart} />
        </div>

        {(isHovered || isFavorite) && (
          <div className={styles.favoriteBtnWrapper}>
            <AddToFavorite
              isFavorite={isFavorite}
              onToggle={() => onToggleFavorite(id)}
            />
          </div>
        )}
      </div>

      {showToast && (
        <Toast
          text={`${name} added to cart`}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export { ShopItem };
