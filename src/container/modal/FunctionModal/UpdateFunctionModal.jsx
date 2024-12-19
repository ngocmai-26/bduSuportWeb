import React, { useEffect, useRef, useState } from "react";
import { FormField } from "../../component/FormField";
import ButtonComponent from "../../component/ButtonComponent";
import { useDispatch } from "react-redux";
import { patchFunction } from "../../../thunks/FunctionThunks";

const UpdateFunctionModal = ({ show, handleClose, initialData }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  console.log("initialData", initialData)

  // Initialize state with the provided initial data or default values
  const [data, setData] = useState(initialData || {});

  
  useEffect(() => {
    if (initialData) {
      // Đặt giá trị từ `item` khi modal hiển thị
      setData({
        name: initialData?.name || "",
        icon: initialData?.icon || null,
        is_show: initialData?.is_show || true,
        order: initialData?.order || 0,
        direct_to: initialData?.direct_to || "",
      });
    }
  }, [initialData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  // Handle order value conversion to number
  useEffect(() => {
    if (data.order && typeof data.order === "string") {
      setData((prevData) => ({
        ...prevData,
        order: parseInt(prevData.order) || 0,
      }));
    }
  }, [data.order]);

  // Handle file input change for icon
  const handleFileChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      icon: e.target.files[0],
    }));
  };

  // Handle form submission to update data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("a", {id: initialData.id, data: initialData})
    dispatch(patchFunction({id: initialData.id, data: data})).then(() => {
      handleClose();
      setData({}); // Reset state after submission
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    });
  };

  // Close modal and reset form data
  const handleCloseModal = () => {
    handleClose();
    setData({});
    fileInputRef.current.value = "";
  };

  return (
    <div className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={handleCloseModal}></div>
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cập nhật chức năng</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tên chức năng</label>
              <FormField
                name="name"
                values={data}
                id="namePatch"
                setValue={setData}
                required="required"
                onChange={handleChange}
                className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Icon (Chọn lại hình ảnh nếu như thay đổi)</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center mt-4">
                <input
                  id="is_showPatch"
                  name="is_show"
                  type="checkbox"
                  checked={data.is_show}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_show" className="ml-2 block text-sm text-gray-900">
                  Hiện thị chức năng
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Thứ tự ưu tiên</label>
              <FormField
                name="order"
                values={data}
                id="orderPatch"
                setValue={setData}
                required="required"
                onChange={handleChange}
                type="number"
                className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Đường dẫn (vd: /dang-ky)</label>
              <FormField
                name="direct_to"
                values={data}
                id="direct_toPatch"
                setValue={setData}
                onChange={handleChange}
                className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <ButtonComponent
                textButton="Cập nhật"
                styleButton="block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFunctionModal;
