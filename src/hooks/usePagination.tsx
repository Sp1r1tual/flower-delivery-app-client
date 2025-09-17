import { useState } from "react";

interface IUsePaginationReturn {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  getPageNumbers: (totalPages: number, maxVisible?: number) => number[];
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const usePagination = (
  initialPage: number = 1,
  initialLimit: number = 8,
): IUsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);

  const getPageNumbers = (
    totalPages: number,
    maxVisible: number = 5,
  ): number[] => {
    const pages: number[] = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);

    return pages;
  };

  return {
    currentPage,
    setCurrentPage,
    getPageNumbers,
    limit,
    setLimit,
  };
};

export { usePagination };
