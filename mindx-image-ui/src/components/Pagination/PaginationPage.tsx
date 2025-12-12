import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PageProps {
  currentPage: number;
  total: number;
  limit?: number;
  handleChangePage: (newPage: number) => void;
}

export default function PaginationPage({
  currentPage,
  total,
  limit = 4,
  handleChangePage,
}: PageProps) {
  const maxPage = Math.ceil(total / limit);

  const renderPageItems = () => {
    const pageItems = [];
    for (let i = 1; i <= maxPage; i++) {
      const isActive = i === currentPage;
      pageItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            className={isActive ? "bg-black text-white" : ""}
            href="#"
            isActive={isActive}
            onClick={() => {
              if (!isActive) {
                handleChangePage(i);
              }
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageItems;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        {renderPageItems()}

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
