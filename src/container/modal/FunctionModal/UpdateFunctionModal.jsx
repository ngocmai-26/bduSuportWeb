import React, { useEffect, useRef, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { useDispatch } from "react-redux";
import { patchFunction } from "../../../thunks/FunctionThunks";
import { setAlert } from "../../../slices/AlertSlice";
import { TOAST_ERROR } from "../../../constants/toast";

const UpdateFunctionModal = ({ show, handleClose, initialData }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // Initialize state with the provided initial data or default values
  const [data, setData] = useState(initialData || {});
  const [changedData, setChangedData] = useState({});

  useEffect(() => {
    if (initialData) {
      // Set initial data when modal is shown
      setData({
        name: initialData?.name || "",
        icon: initialData?.icon || null,
        is_show: initialData?.is_show || true,
        order: initialData?.order || 0,
        direct_to: initialData?.direct_to || "",
      });
      setChangedData({}); // Reset changedData when initialData changes
    }
  }, [initialData]);

  // Handle input change and track only the changed fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setData((prevData) => {
      const updatedData = { ...prevData, [name]: newValue };

      setChangedData((prevChangedData) => {
        const initialVal = initialData[name] || ""; // Fallback to empty string if undefined
        if (updatedData[name] !== initialVal) {
          return { ...prevChangedData, [name]: updatedData[name] };
        } else {
          const { [name]: _, ...rest } = prevChangedData;
          return rest;
        }
      });

      return updatedData;
    });
  };

  // Handle file input change for icon
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];

    setData((prevData) => {
      const updatedData = { ...prevData, icon: newFile };

      setChangedData((prevChangedData) => {
        if (updatedData.icon !== initialData.icon) {
          return { ...prevChangedData, icon: updatedData.icon };
        } else {
          const { icon, ...rest } = prevChangedData;
          return rest;
        }
      });

      return updatedData;
    });
  };

  // Handle form submission to update data
  const handleSubmit = (e) => {
    e.preventDefault();

    // If there are any changes, submit them
    if (Object.keys(changedData).length > 0) {

      dispatch(patchFunction({ id: initialData.id, data: changedData }))
        .then(() => {
          handleClose(); // Close the modal on success
          setData({}); // Reset form data
          setChangedData({}); // Reset changed data
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input
          }
        })
        .catch((error) => {
          console.error("Failed to submit changes:", error);
          // Optionally, show an error message if needed
        });
    } else {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: "Dữ liệu không có thay đổi" })
      );
    }
  };

  // Close modal and reset form data
  const handleCloseModal = () => {
    handleClose();
    setData({});
    setChangedData({});
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
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleCloseModal}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Cập nhật chức năng
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-700">
                Tên chức năng
              </label>
              <input
                type="text"
                name="name"
                value={data.name || ""}
                onChange={handleChange}
                required
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-700">
                Icon (Chọn lại hình ảnh nếu như thay đổi)
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center mt-4">
                <input
                  id="is_showPatch"
                  name="is_show"
                  type="checkbox"
                  checked={data.is_show || false}
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
                Thứ tự ưu tiên
              </label>
              <input
                type="number"
                name="order"
                value={data.order || ""}
                onChange={handleChange}
                required
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Đường dẫn (vd: /dang-ky)
              </label>
              <input
                type="text"
                name="direct_to"
                value={data.direct_to ||""}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
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
