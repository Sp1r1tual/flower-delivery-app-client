import styles from "./styles/Sort.module.css";

interface ISortProps {
  sort: "byPrice" | "byDate";
  onChange: (value: "byPrice" | "byDate") => void;
}

const Sort = ({ sort, onChange }: ISortProps) => {
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
