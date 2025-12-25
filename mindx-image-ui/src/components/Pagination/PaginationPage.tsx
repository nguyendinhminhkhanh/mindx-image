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
  maxPage: number;
  handleChangePage: (newPage: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export default function PaginationPage({
  currentPage,
  maxPage,
  handleChangePage,
  handlePrev,
  handleNext,
}: PageProps) {
  const isNextDisabled = currentPage === maxPage;
  const isPrevDisabled = currentPage === 1;
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
          <PaginationPrevious
            className={isPrevDisabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={!isPrevDisabled ? handlePrev : undefined}
          />
        </PaginationItem>

        {renderPageItems()}

        <PaginationItem>
          <PaginationNext
            className={isNextDisabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={!isNextDisabled ? handleNext : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
