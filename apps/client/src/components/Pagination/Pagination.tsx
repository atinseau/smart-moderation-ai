import { useState } from "react";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  maxVisiblePages?: number; // Maximum number of visible pages in pagination
  onPageChange: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return; // Do not change if page is out of bounds
    }
    setCurrentPage(page);
    props.onPageChange(page);
  }

  // Generates an array of numbers from start to end inclusive
  const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Determines the number of middle pages to display
  const getNumMiddlePages = (maxVisible: number): number => {
    return Math.max(0, maxVisible - 2);
  };

  // Calculates the window of middle pages to display around the current page
  const getMiddlePageWindow = (
    currentPage: number,
    totalPages: number,
    numMiddlePages: number
  ): { start: number; end: number } => {
    let start = Math.max(2, currentPage - Math.floor(numMiddlePages / 2));
    let end = start + numMiddlePages - 1;

    if (end > totalPages - 1) {
      end = totalPages - 1;
      start = Math.max(2, end - numMiddlePages + 1);
    }

    if (start < 2) {
      start = 2;
      end = Math.min(totalPages - 1, start + numMiddlePages - 1);
    }

    return { start, end };
  };

  // Adds an ellipsis (false) if needed between two non-consecutive pages
  const maybeAddEllipsis = (pages: (number | false)[], prevPage: number, nextPage: number) => {
    if (nextPage > prevPage + 1) {
      pages.push(false);
    }
  };

  // Generates the final list of pages to display (with false for ellipses)
  const getVisiblePages = (): (number | false)[] => {
    const maxVisible = props.maxVisiblePages || totalPages;

    // If all pages fit, display them all
    if (maxVisible >= totalPages) {
      return range(1, totalPages);
    }

    const pages: (number | false)[] = [];
    const numMiddlePages = getNumMiddlePages(maxVisible);

    // Always include the first page
    pages.push(1);

    // Special case: maxVisible < 3, only show first and last page (or less)
    if (maxVisible < 3) {
      if (totalPages > 1) {
        if (totalPages > 2) {
          pages.push(false);
        }
        pages.push(totalPages);
      }
      return pages;
    }

    // Calculate the middle window
    const { start, end } = getMiddlePageWindow(currentPage, totalPages, numMiddlePages);

    // Ellipsis after the first page if needed
    maybeAddEllipsis(pages, 1, start);

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Ellipsis before the last page if needed
    maybeAddEllipsis(pages, end, totalPages);

    // Always include the last page if more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };


  if (totalPages <= 1) {
    return null; // No need for pagination if only one page
  }

  const visiblePages = getVisiblePages();

  return <div className="flex items-center justify-center space-x-2 pt-4">
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
    >
      Précédent
    </Button>

    {visiblePages.map((page, idx) =>
      typeof page === "number" ? (
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          className="border-[1px]"
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
        >
          {page}
        </Button>
      ) : (
        <span key={`ellipsis-${idx}`} className="px-2 select-none text-muted-foreground">
          <MoreHorizontal />
        </span>
      )
    )}

    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      Suivant
    </Button>
  </div>

}
