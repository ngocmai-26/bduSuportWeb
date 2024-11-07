import React, { useState } from 'react';
import PaginationComponent from './PaginationComponent'; // Import the Pagination component

const TableComponent = ({ data, headers, columns, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="mx-auto p-4 bg-white shadow rounded-lg">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b bg-gray-100 text-left text-gray-600 text-sm font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="px-4 py-2 text-center text-gray-500"
              >
                Hiện tại chưa có dữ liệu
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border-b text-md text-gray-700"
                  >
                    {/* Check if column is a function to render */}
                    {typeof column === 'function'
                      ? column(row, (currentPage - 1) * rowsPerPage + rowIndex + 1) // Pass the index to column function
                      : row[column]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Only show pagination if there's data */}
      {data.length > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TableComponent;