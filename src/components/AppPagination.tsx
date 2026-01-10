import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type AppPaginationProps = {
  currPage: number;
  hasNextPage?: boolean;
  showPageNumbers?: boolean;
  onChangePage: (newPage: number) => void;
};

function AppPagination({
  currPage,
  hasNextPage = true,
  showPageNumbers = false,
  onChangePage,
}: AppPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currPage === 0}
            onClick={() => onChangePage(currPage - 1)}
          />
        </PaginationItem>

        {showPageNumbers && <div>page number</div>}

        <PaginationItem>
          <PaginationNext
            disabled={!hasNextPage}
            onClick={() => onChangePage(currPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default AppPagination;
