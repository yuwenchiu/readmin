import { DEFAULT_ITEMS_PER_PAGE } from "@/api/books";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type AppPaginationProps = {
  currPage: number;
  totalItems: number;
  itemsPerPage?: number;
  showPageNumbers?: boolean;
  onChangePage: (newPage: number) => void;
};

function AppPagination({
  currPage,
  totalItems,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  showPageNumbers = false,
  onChangePage,
}: AppPaginationProps) {
  const hasNextPage = (currPage + 1) * itemsPerPage <= totalItems;
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
