// src/modal/DetailFeedbackModal.jsx
import React from 'react';

const DetailFeedbackModal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;
  console.log("item", item)


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-6 relative overflow-hidden">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Chi Tiết Nội dung feedback</h2>
        {item ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="mb-4 w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  Tiêu đề
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"title"}
                  value={item.title}
                  id={"title"}
                  required={"required"}
                />
              </div>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium text-gray-700">
                  SDT feedback
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"phone_number"}
                  value={item.phone_number}
                  id={"phone_number"}
                  required={"required"}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-4 w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  Người feedback
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"feedbacker_role"}
                  value={item.feedbacker_role}
                  id={"feedbacker_role"}
                  required={"required"}
                />
              </div>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium text-gray-700">
                  Nội dung Feedback
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"content"}
                  value={item.content}
                  id={"content"}
                  required={"required"}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Không có thông tin tài khoản.</p>
        )}
        
      </div>
    </div>
  );
};

export default DetailFeedbackModal;
