// src/pages/HomePage.jsx
import React, { useState } from 'react';
import LayoutWeb from './layoutWeb';
import TableComponent from '../component/TableComponent';
import DetailAccountModal from '../modal/Account/detailAccountModal';

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Michael Holz',
      dateCreated: '04/10/2013',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Paula Wilson',
      dateCreated: '05/08/2014',
      role: 'Publisher',
      status: 'Active',
    },
    // Thêm các dữ liệu khác nếu cần
  ]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowDetailModal = () => setShowDetailModal(true);
  const handleCloseDetailModal = () => setShowDetailModal(false);

  const handleCreateAccount = () => {
    handleShowModal();
  };

  const headers = ['#', 'Name', 'Date Created', 'Role', 'Status', 'Action'];
  const columns = [
    'id',
    'name',
    'dateCreated',
    'role',
    'status',
    (row) => (
      <div>
        <button
          className="text-blue-500 hover:underline mr-2"
          onClick={() => handleView(row)}
        >
          Xem
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(row.id)}
        >
          Xóa
        </button>
      </div>
    ),
  ];

  const handleView = (row) => {
    setSelectedItem(row);
    handleShowDetailModal();
  };

  const handleDelete = (id) => {
    // Lọc dữ liệu để loại bỏ mục có id tương ứng
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  return (
    <LayoutWeb>
      <div className="px-10">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
          onClick={handleCreateAccount}
        >
          Tạo tài khoản
        </button>
        <TableComponent
          data={data}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
        />
      </div>
      {/* <ModalAddAccount show={showModal} handleClose={handleCloseModal} /> */}
      <DetailAccountModal
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        item={selectedItem}
      />
    </LayoutWeb>
  );
}

export default HomePage;
