// src/modal/DetailAccountModal.jsx
import React from 'react';

const DetailAccountModal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-6 relative overflow-hidden">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Chi Tiết Tài Khoản</h2>
        {item ? (
          <div className="space-y-2">
            <p><strong className="text-gray-600">ID:</strong> {item.id}</p>
            <p><strong className="text-gray-600">Email:</strong> {item.email}</p>
            <p><strong className="text-gray-600">Phone:</strong> {item.phone}</p>
            <p><strong className="text-gray-600">Role:</strong> {item.role}</p>
            <p><strong className="text-gray-600">Status:</strong> {item.status}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Không có thông tin tài khoản.</p>
        )}
        <div className="mt-6 text-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition duration-200"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailAccountModal;
