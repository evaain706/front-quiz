interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const MAX_PAGE = 5;

  let startPage = Math.max(currentPage - Math.floor(MAX_PAGE / 2), 1);
  let endPage = startPage + MAX_PAGE - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - MAX_PAGE + 1, 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='mt-4 flex w-full items-center justify-center gap-2'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='rounded border bg-white px-3 py-1 disabled:opacity-50'
      >
        이전
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className='rounded border bg-white px-3 py-1'
          >
            1
          </button>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`rounded border px-3 py-1 ${num === currentPage ? 'bg-blue-500 text-white' : 'bg-white'}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className='rounded border bg-white px-3 py-1'
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='rounded border bg-white px-3 py-1 disabled:opacity-50'
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
