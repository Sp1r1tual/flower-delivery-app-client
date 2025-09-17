import styles from "./styles/Pagination.module.css";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
  getPageNumbers: (totalPages: number, maxVisible?: number) => number[];
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
  onPageChange,
  getPageNumbers,
  className = "",
}: IPaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(totalPages);

  return (
    <div className={`${styles.pagination} ${className}`}>
      <button disabled={!hasPrev} onClick={() => onPageChange(currentPage - 1)}>
        ＜
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? styles.active : ""}
          disabled={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button disabled={!hasNext} onClick={() => onPageChange(currentPage + 1)}>
        ＞
      </button>
    </div>
  );
};

export { Pagination };
