import { useNavigate } from "react-router-dom";

import backIcon from "@/assets/back-svgrepo-com.svg";

import styles from "./styles/BackBtn.module.css";

type BackBtnProps = {
  to?: string;
};

const BackBtn = ({ to }: BackBtnProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleClick} className={styles.backBtn}>
      <img src={backIcon} alt="Back" className={styles.icon} />
    </button>
  );
};

export { BackBtn };
