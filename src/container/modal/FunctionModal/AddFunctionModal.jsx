import React, { useEffect, useRef, useState } from "react";
import { FormField } from "../../component/FormField";
import ButtonComponent from "../../component/ButtonComponent";
import { createFunction } from "../../../thunks/FunctionThunks";
import { useDispatch } from "react-redux";

const AddFunctionModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    name: "",
    icon: null,
    is_show: true,
    disable_miniapp_user_hidden: true,
    order: 0,
    direct_to: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (data.order && typeof data.order === "string") {
      setData((prevData) => ({
        ...prevData,
        order: parseInt(prevData.order) || 0, 
      }));
    }
  }, [data.order]);

  const handleFileChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      icon: e.target.files[0], 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFunction(data)).then((res) => {
      handleClose();
      setData({});
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
    });
  };

  const handleCloseModal = () => {
    handleClose();
    setData({});
    fileInputRef.current.value = "";
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleCloseModal}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Thêm chức năng
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên chức năng
              </label>
            <FormField
              name="name"
              values={data}
              id="name"
              setValue={setData}
              required="required"
              onChange={handleChange}
              className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                icon
              </label>
              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Có hiện thị chức năng không?
              </label>

            <div className="flex items-center mt-4">
              <input
                id="is_show"
                name="is_show"
                type="checkbox"
                checked={data.is_show}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="is_show"
                className="ml-2 block text-sm text-gray-900"
              >
                Hiện thị chức năng
              </label>
            </div>
          
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
              Người dùng có được bật tắt chức năng này không
              </label>

            <div className="flex items-center mt-4">
              <input
                id="disable_miniapp_user_hidden"
                name="disable_miniapp_user_hidden"
                type="checkbox"
                checked={data.disable_miniapp_user_hidden}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="disable_miniapp_user_hidden"
                className="ml-2 block text-sm text-gray-900"
              >
                Không Cho phép
              </label>
            </div>
       
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Thứ tự ưu tiên
              </label>

            <FormField
              name="order"
              values={data}
              id="order"
              setValue={setData}
              required="required"
              onChange={handleChange}
              type="number"
              className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />

            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Đường dẫn (vd: /dang-ky)
              </label>

            <FormField
              name="direct_to"
              values={data}
              id="direct_to"
              setValue={setData}
              onChange={handleChange}
              className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />

            </div>

            <div className="mt-4 flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                styleButton="block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFunctionModal;
