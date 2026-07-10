type ListPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function ListPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ListPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:flex-row sm:justify-between">
      <p className="text-sm text-base-content/70">
        Page {currentPage} of {totalPages}
      </p>

      <div className="join flex-wrap justify-center">
        <button
          type="button"
          className="btn btn-sm join-item"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`btn btn-sm join-item ${
              page === currentPage ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="btn btn-sm join-item"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListPagination;
