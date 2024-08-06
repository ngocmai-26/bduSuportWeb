// PaginationComponent.js
import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3  py-1 bg-gray-300 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <ul className="flex space-x-2 mx-4">
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <button
              onClick={() => onPageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                index + 1 === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-300 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
