// src/modal/DetailInfoStudentModal.jsx
import React from "react";

const DetailInfoStudentModal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-10 overflow-y-auto `}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Chi tiết chức năng
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={onClose}
          >
            X
          </button>
          <form>
            <div className="flex gap-2">
              <div className="mb-4 w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"full_name"}
                  value={item.full_name}
                  id={"full_name"}
                  required={"required"}
                />
              </div>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"email"}
                  value={item.email}
                  id={"email"}
                  required={"required"}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-4  w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  SDT
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
              <div className="mb-4 w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  CCCD
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"citizen_id_card"}
                  value={item.citizen_id_card}
                  id={"citizen_id_card"}
                  required={"required"}
                />
              </div>
            </div>
<div className="flex gap-2">
<div className="mb-4  w-[50%]">
              <label className="block text-sm font-medium text-gray-700">
                SDT Zalo
              </label>
              <input
                className="border w-full p-1.5 rounded-md"
                disabled
                name={"zalo_phone_number"}
                value={item.zalo_phone_number}
                id={"zalo_phone_number"}
                required={"required"}
              />
            </div>

            <div className="mb-4  w-[50%]" >
              <label className="block text-sm font-medium text-gray-700">
                Tên lớp
              </label>
              <input
                className="border w-full p-1.5 rounded-md"
                disabled
                name={"class_name"}
                value={item.class_name}
                id={"class_name"}
                required={"required"}
              />
            </div>
</div>
            <div className="flex gap-2">
<div className="mb-4 w-[50%]">
              <label className="block text-sm font-medium text-gray-700">
                Tên trường
              </label>
              <input
                className="border w-full p-1.5 rounded-md"
                disabled
                name={"school_name"}
                value={item.school_name}
                id={"school_name"}
                required={"required"}
              />
            </div>
            <div className="mb-4 w-[50%]">
              <label className="block text-sm font-medium text-gray-700">
                Tỉnh/Thành phố
              </label>
              <input
                className="border w-full p-1.5 rounded-md"
                disabled
                name={"province_name"}
                value={item.province_name}
                id={"province_name"}
                required={"required"}
              />
            </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                className="border w-full p-1.5 rounded-md"
                disabled
                name={"address"}
                value={item.address}
                id={"address"}
                required={"required"}
              />
            </div>
             <div className="flex gap-2">
<div className="mb-4 w-[50%]">
              <label className="block text-sm font-medium text-gray-700">
                Mã ngành
              </label>
              <input
                className="border w-full p-1.5 rounded-md"
                disabled
                name={"code"}
                value={item.major.code}
                id={"code"}
                required={"required"}
              />
            </div>
            <div className="mb-4 w-[50%]">
              <label className="block text-sm font-medium text-gray-700">
                Ngành đăng ký
              </label>
              <input
                className="border w-full p-1.5 rounded-md"
                disabled
                name={"major"}
                value={item.major.name}
                id={"major"}
                required={"required"}
              />
            </div>
             </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ đăng ký
              </label>
              <input
                className="border w-full p-1.5 rounded-md"
                disabled
                name={"training_location_name"}
                value={item.major.training_location_name}
                id={"training_location_name"}
                required={"required"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
   
  );
};

export default DetailInfoStudentModal;
