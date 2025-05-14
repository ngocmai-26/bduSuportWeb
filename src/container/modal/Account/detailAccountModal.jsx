// src/modal/DetailAccountModal.jsx
import React from 'react';

const DetailAccountModal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;


  return (

     <div
          className={`fixed inset-0 z-10 overflow-y-auto `}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
          
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Chi tiết tài khoản
              </h2>
              <button
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
                onClick={onClose} 
              >
                X
              </button>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input className='border w-full p-1.5 rounded-md' disabled
                    name={"email"}
                    value={item.email}
                    id={"email"}
                    required={"required"}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input className='border w-full p-1.5 rounded-md' disabled
                    name={"phone"}
                    value={item.phone}
                    id={"phone"}
                    required={"required"}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Chức vụ
                  </label>
                  <input className='border w-full p-1.5 rounded-md' disabled
                    name={"role"}
                    value={item.role}
                    id={"role"}
                    required={"required"}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Trạng thái
                  </label> 
                  <input className='border w-full p-1.5 rounded-md' disabled
                    name={"status"}
                    value={item.status}
                    id={"status"}
                    required={"required"}
                  />
                </div>
                
              </form>
            </div>
          </div>
        </div>
   
  );
};

export default DetailAccountModal;
