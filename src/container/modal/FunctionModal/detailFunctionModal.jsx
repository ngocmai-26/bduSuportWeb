import React, { useEffect, useRef, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { useDispatch } from "react-redux";
import { patchFunction } from "../../../thunks/FunctionThunks";
import { setAlert } from "../../../slices/AlertSlice";
import { TOAST_ERROR } from "../../../constants/toast";

const DetailFunctionModal = ({ show, handleClose, initialData }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  console.log("initialData", initialData);

  // Initialize state with the provided initial data or default values
  const [data, setData] = useState(initialData || {});

  // Close modal and reset form data
  const handleCloseModal = () => {
    handleClose();
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${
        show ? "block" : "hidden"
      }`}
    >

      <div className={`fixed inset-0 z-10 overflow-y-auto `}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Chi tiết chức năng
            </h2>
            <button
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
              onClick={handleCloseModal}
            >
              X
            </button>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tên chức năng
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"name"}
                  value={initialData?.name}
                  id={"name"}
                  required={"required"}
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Icon (Chọn lại hình ảnh nếu như thay đổi)
                </label>
                <img src={initialData?.icon_url} className="w-24 h-24" />
              </div>
              <label className="block text-sm font-medium text-gray-700">
                Có hiện thị chức năng không?
              </label>
              <div className="flex items-center">
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"is_show"}
                  value={initialData?.is_show? "Có" : "Không"}
                  id={"is_show"}
                  required={"required"}
                />
              </div>
              <div className="my-4">
              <label className="block text-sm font-medium text-gray-700">
                Người dùng có được bật tắt chức năng này không
              </label>
               <div className="flex items-center">
             
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"disable_miniapp_user_hidden"}
                  value={initialData?.disable_miniapp_user_hidden ? "Có": "Không"}
                  id={"disable_miniapp_user_hidden"}
                  required={"required"}
                />
              </div>
              </div>
              <div className="mb-4">
                 <label className="block text-sm font-medium text-gray-700">
                Thứ tự ưu tiên
              </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"order"}
                  value={initialData?.order}
                  id={"order"}
                  required={"required"}
                />
              </div>
              <div className="mb-4">
                 <label className="block text-sm font-medium text-gray-700">
                Đường dẫn (vd: /dang-ky)
              </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"direct_to"}
                  value={initialData?.direct_to}
                  id={"direct_to"}
                  required={"required"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailFunctionModal;
