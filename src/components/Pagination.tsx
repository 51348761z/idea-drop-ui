type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination">
      <ul className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, idx) => {
          const page = idx + 1;
          return (
            <li key={page}>
              <button
                aria-current={currentPage === page ? "page" : undefined}
                className={`cursor-pointer rounded px-3 py-1 ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
