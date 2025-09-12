import { SortProps } from "@/types";

import styles from "./styles/Sort.module.css";

const Sort = ({ sort, onChange }: SortProps) => {
  return (
    <div className={styles.sort}>
      <button
        className={sort === "byPrice" ? styles.active : ""}
        onClick={() => onChange("byPrice")}
      >
        Sort by price
      </button>
      <button
        className={sort === "byDate" ? styles.active : ""}
        onClick={() => onChange("byDate")}
      >
        Sort by date
      </button>
    </div>
  );
};

export { Sort };
