import { useRef, useEffect, useCallback } from "react";

import styles from "./styles/ToggleBtn.module.css";

interface IToggleButtonProps {
  openText: string;
  closeText: string;
  isOpenRef: React.RefObject<boolean>;
  onToggle: () => void;
}

const ToggleButton = ({
  isOpenRef,
  onToggle,
  openText,
  closeText,
}: IToggleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const updateText = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.textContent = isOpenRef.current ? closeText : openText;
    }
  }, [isOpenRef, openText, closeText]);

  useEffect(() => {
    updateText();
  }, [updateText]);

  return (
    <button
      ref={buttonRef}
      className={styles.toggleButton}
      onClick={() => {
        onToggle();
        updateText();
      }}
    />
  );
};

export { ToggleButton };
