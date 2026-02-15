import { useState } from "react";

type UsePaginationProps<T> = {
  data: T[];
  itemsPerPage: number;
};

export const usePagination = <T>({
  data,
  itemsPerPage,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // If current page exceeds total pages (e.g. after data changes), reset to last page
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  const currentPageData = () => {
    const end = currentPage * itemsPerPage;
    const begin = end - itemsPerPage;
    return data.slice(begin, end);
  };

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, totalPages));
  };

  return {
    next,
    prev,
    jump,
    currentPageData: currentPageData(),
    currentPage,
    totalPages,
  };
};
