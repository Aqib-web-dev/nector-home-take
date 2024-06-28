"use client";
import { generatePageNumbers } from "@/utils/generatePageNumbers";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        &lt;
      </button>
      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-full ${
              page === currentPage
                ? "bg-gray-300"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1">
            {page}
          </span>
        )
      )}
      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
