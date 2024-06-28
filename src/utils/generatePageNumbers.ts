export const generatePageNumbers = (
  currentPage: number,
  totalPages: number
) => {
  const pageNumbers: (number | string)[] = [];
  const totalPageNumbers = 7;

  if (totalPages <= totalPageNumbers) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);
    const hasLeftEllipsis = startPage > 2;
    const hasRightEllipsis = endPage < totalPages - 1;

    pageNumbers.push(1);

    if (hasLeftEllipsis) {
      pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (hasRightEllipsis) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};
