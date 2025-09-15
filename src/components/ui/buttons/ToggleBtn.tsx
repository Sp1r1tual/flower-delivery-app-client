import styles from "./styles/ToggleBtn.module.css";

interface IToggleButtonProps {
  openText: string;
  closeText: string;
  isOpen: boolean;
  onToggle: () => void;
}

const ToggleButton = ({
  isOpen,
  onToggle,
  openText,
  closeText,
}: IToggleButtonProps) => {
  return (
    <button className={styles.toggleButton} onClick={onToggle}>
      {isOpen ? closeText : openText}
    </button>
  );
};

export { ToggleButton };
