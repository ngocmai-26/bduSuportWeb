// PaginationComponent.js
import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationRange = () => {
    const range = [];
    const maxButtons = 7; // Maximum number of page buttons to show (including ellipses)

    if (totalPages <= maxButtons) {
      // If the total number of pages is less than or equal to maxButtons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Calculate pagination with ellipses for larger page numbers
      const showLeftEllipsis = currentPage > 3;
      const showRightEllipsis = currentPage < totalPages - 3;

      if (showLeftEllipsis && !showRightEllipsis) {
        // Show ellipsis on the left when currentPage is near the end
        range.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else if (!showLeftEllipsis && showRightEllipsis) {
        // Show ellipsis on the right when currentPage is near the beginning
        range.push(1, 2, 3, 4, '...', totalPages);
      } else if (showLeftEllipsis && showRightEllipsis) {
        // Show ellipses on both sides when currentPage is in the middle
        range.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return range;
  };

  return (
    <div className="flex items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-300 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        	&lt;
      </button>
      <ul className="flex space-x-2 mx-4">
        {getPaginationRange().map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-300 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginationComponent;
