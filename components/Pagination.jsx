import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';

export function PaginationComponent({ table }) {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();

    const generatePageNumbers = () => {
        const displayedNumbers = []; // Array to show page numbers that must be diplayed, for example 1 2 3 ... <totalPages> or 1 ... 4 5 6 ... <totalPages>
        
        if(totalPages === 1) {
          displayedNumbers.push(totalPages);
        }else if (totalPages < 4) {
            for (let i = 1; i <= totalPages; i++) {
                displayedNumbers.push(i);
            }
            } else {
            if (currentPage < 3) {
                for (let i = 1; i <= 3; i++) {
                    displayedNumbers.push(i);
                }
                displayedNumbers.push("ellipsis");
                displayedNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                displayedNumbers.push(1);
                displayedNumbers.push("ellipsis");
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    displayedNumbers.push(i);
                }
            } else {
                displayedNumbers.push(1);
                displayedNumbers.push("ellipsis");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    displayedNumbers.push(i);
                }
                displayedNumbers.push("ellipsis");
                displayedNumbers.push(totalPages);
            }
            }

        return displayedNumbers;
      };

  return (
    <Pagination>
      <PaginationContent>
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="mx-5"
        >
            Previous <ChevronLeftIcon />
        </Button>

        {generatePageNumbers().map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === "ellipsis" ? (
            <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={pageNumber === currentPage}
                onClick={() => table.setPageIndex(pageNumber - 1)}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="mx-5"
        >
            Next <ChevronRightIcon />
        </Button>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComponent;
