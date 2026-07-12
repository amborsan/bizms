import Button from "../../atoms/button";

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
        <Button
          type="button"
          size="sm"
          className="join-item"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>

        {pages.map((page) => (
          <Button
            key={page}
            type="button"
            size="sm"
            variant={page === currentPage ? "primary" : "outline"}
            className="join-item"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          type="button"
          size="sm"
          className="join-item"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ListPagination;
